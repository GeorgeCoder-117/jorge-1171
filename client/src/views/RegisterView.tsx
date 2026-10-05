import { useState, type ChangeEvent, type FormEvent } from 'react';

import { useAuth } from '../hooks/useAuth';
import type { RegisterFormData, ValidationErrors } from '../types/auth';

import { validateRegisterForm } from '../utils/validators';

import { InputGroup } from '../components/InputGroup';
import { GeneralButton } from '../components/GeneralButton';

const initialFormData: RegisterFormData = {
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

export const RegisterView = () => {
  const { register, navigateTo, isLoading } = useAuth();

  const [formData, setFormData] = useState<RegisterFormData>(initialFormData);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [fatalError, setFatalError] = useState<string | null>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const fieldName = name as keyof RegisterFormData;

    setFormData((prev) => ({ ...prev, [fieldName]: value }));

    if (errors[fieldName]) {
      setErrors((prev) => ({ ...prev, [fieldName]: undefined }));
    }

    setFatalError(null);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationErrors = validateRegisterForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    try {
      await register(formData);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setFatalError(err.message);
      } else {
        setFatalError('Ocurrió un error inesperado al registrar.');
      }
    }
  };

  return (
    <div>
      <h1 className='titleCard'>Registro</h1>
      <h4 className='subtitleCard'>Registra tus datos para acceder a la plataforma.</h4>

      {fatalError && <div className="error-message">{fatalError}</div>}

      <form onSubmit={handleSubmit} noValidate>
        <InputGroup
          label="Nombre completo"
          name="fullName"
          type="text"
          value={formData.fullName}
          onChange={handleChange}
          error={errors.fullName}
          placeholder="Luis Hernández"
          autoComplete="name"
        />

        <InputGroup
          label="Correo electrónico"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          placeholder="correo@ejemplo.com"
          autoComplete="email"
        />

        <InputGroup
          label="Contraseña"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          placeholder="••••••"
          autoComplete="new-password"
        />

        <InputGroup
          label="Confirmar contraseña"
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
          placeholder="Confirma tu contraseña"
          autoComplete="new-password"
        />

        <GeneralButton loading={isLoading} view="register" />
      </form>

      <p>
        ¿Ya tienes una cuenta?{' '}
        <button type="button" className="btn-link" onClick={() => navigateTo('login')}>
          Iniciar Sesión
        </button>
      </p>
    </div>
  );
};