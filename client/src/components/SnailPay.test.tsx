import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import type { User } from '../types/auth';
import { AuthContext } from '../context/AuthContext';
import { apiClient } from '../services/apiService';
import { SnailPay } from './SnailPay';

vi.mock('../services/apiService', () => ({
  apiClient: {
    getStatus: vi.fn(),
    postData: vi.fn(),
  },
}));

describe('SnailPay', () => {
  const user: User = {
    id: 'user-1',
    fullName: 'Juan Pérez',
    email: 'juan@test.com',
    createdAt: '2025-01-01T00:00:00.000Z',
    balance: 0,
  };

  beforeEach(() => {
    vi.clearAllMocks();

    vi.mocked(apiClient.getStatus).mockResolvedValue({
      success: true,
      message: 'Servicio disponible',
      data: {
        status: 'ok',
        status_detail: 'Servicio activo',
      },
    });
  });

  it('dispara el submit al hacer click en el botón Recargar', async () => {
    const recharge = vi.fn();

    vi.mocked(apiClient.postData).mockResolvedValue({
      success: true,
      message: 'Recarga realizada correctamente',
      data: {
        status: 'ok',
        status_detail: 'La recarga fue exitosa',
      },
    });

    render(
      <AuthContext.Provider
        value={{
          user,
          isAuthenticated: true,
          isLoading: false,
          currentView: 'welcome',
          register: vi.fn(),
          login: vi.fn(),
          recharge,
          logout: vi.fn(),
          navigateTo: vi.fn(),
        }}
      >
        <SnailPay />
      </AuthContext.Provider>
    );

    await screen.findByRole('button', { name: /recargar/i });

    fireEvent.change(screen.getByLabelText(/número de tarjeta/i), {
      target: { name: 'cardNumber', value: '1234567890123456' },
    });

    fireEvent.change(screen.getByLabelText(/fecha de expiración/i), {
      target: { name: 'cardExpirationDate', value: '1229' },
    });

    fireEvent.change(screen.getByLabelText(/cvv de su tarjeta/i), {
      target: { name: 'cardCvv', value: '123' },
    });

    fireEvent.change(screen.getByPlaceholderText('Juan Perez Galindez'), {
      target: { name: 'cardOwner', value: 'Juan Perez' },
    });

    fireEvent.change(screen.getByPlaceholderText(/monto de recarga/i), {
      target: { name: 'cardRecharge', value: '100' },
    });

    fireEvent.click(screen.getByRole('button', { name: /recargar/i }));

    await waitFor(() => {
      expect(apiClient.postData).toHaveBeenCalledWith(
        expect.objectContaining({
          cardNumber: '1234567890123456',
          cardExpirationDate: '1229',
          cardCvv: '123',
          cardOwner: 'Juan Perez',
          cardRecharge: '100',
          idUser: user.id,
          email: user.email,
        })
      );
      expect(recharge).toHaveBeenCalledTimes(1);
    });
  });
});


