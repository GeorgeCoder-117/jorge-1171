import type { User, UserRecord, RegisterFormData, LoginFormData } from '../types/auth';
import type { LoadData } from '../types/api';
import { USERS_KEY, SESSION_KEY } from '../consts/config';

import CryptoJS from 'crypto-js';

// Funciones auxiliares privadas para manipular LocalStorage
const getStoredUsers = (): UserRecord[] => {
  try {
    const data = localStorage.getItem(USERS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error leyendo simulación de base de datos local:', error);
    return [];
  }
};

const saveUsers = (users: UserRecord[]): void => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const authService = {
  // Registrar nuevo usuario
  register: async (data: RegisterFormData): Promise<User> => {
    // Simula una pequeña latencia de red
    await new Promise((resolve) => setTimeout(resolve, 300));

    const normalizedEmail = data.email.trim().toLowerCase();
    
    const users = getStoredUsers();
    const exists = users.some((u) => u.email.toLowerCase() === normalizedEmail);
    if (exists) {
      throw new Error('El correo electrónico ya está registrado.');
    }

    const newUserRecord: UserRecord = {
      id: crypto.randomUUID(),
      fullName: data.fullName.trim(),
      email: normalizedEmail,
      password: CryptoJS.SHA256(data.password).toString(),
      createdAt: new Date().toISOString(),
      balance: 0,
    };

    users.push(newUserRecord);
    saveUsers(users);

    // Extraemos la contraseña para no guardarla en la sesión activa
    const { password, ...sessionUser } = newUserRecord;
    localStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser));

    return sessionUser;
  },

  // Iniciar sesión
  login: async (credentials: LoginFormData): Promise<User> => {
    await new Promise((resolve) => setTimeout(resolve, 300));

    const users = getStoredUsers();
    const normalizedEmail = credentials.email.trim().toLowerCase();

    const foundUser = users.find(
      (u) => u.email.toLowerCase() === normalizedEmail && u.password === CryptoJS.SHA256(credentials.password).toString()
    );

    if (!foundUser) {
      throw new Error('Credenciales incorrectas. Verifique su correo y contraseña.');
    }

    const { password, ...sessionUser } = foundUser;
    localStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser));

    return sessionUser;
  },

  // Recuperar la sesión persistente al recargar la página
  getActiveSession: (): User | null => {
    try {
      const data = localStorage.getItem(SESSION_KEY);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error al recuperar la sesión activa:', error);
      return null;
    }
  },

  // Agregar recarga a balance del usuario
  rechargeBalance: async (cardData: LoadData): Promise<User> => {
    await new Promise((resolve) => setTimeout(resolve, 300));

    const users = getStoredUsers();
    const userUpdated = users.map((item) => {
      if (item.id === cardData.payer_id) {
        const rechargeAmount = parseInt(cardData.transaction_amount);

        const newBalance = item.balance + rechargeAmount;
        return {
          ...item,
          balance: newBalance
        };
      }
      return item;
    });
    localStorage.setItem(USERS_KEY, JSON.stringify(userUpdated)); //Base de datos de usuarios actualizada

    //Procedemos a buscar usuario de Array of users
    const normalizedEmail = cardData.payer_email.trim().toLowerCase();
    const usersLastChanges = getStoredUsers();
    const foundUser = usersLastChanges.find(
      (u) => u.email.toLowerCase() === normalizedEmail && u.id === cardData.payer_id
    );

    if (!foundUser) {
      throw new Error('Usuario no encontrado o inexistente. Imposible agregar recarga.');
    }

    //Actualizamos ahora la sesión y volvemos a quitar password
    const { password, ...sessionUser } = foundUser; 
    localStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser));

    //Guardamos CardNumber y CVV
    const cardInfo = {
      number: cardData.cardNumber,
      cvv: cardData.cardCvv
    }
    localStorage.setItem('card', JSON.stringify(cardInfo))

    return sessionUser;
  },

  // Cerrar sesión
  logout: (): void => {
    localStorage.removeItem(SESSION_KEY);
    localStorage.removeItem('card');
  },
};