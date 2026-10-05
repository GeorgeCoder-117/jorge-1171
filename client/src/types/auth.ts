export interface User {
  id: string;
  fullName: string;
  email: string;
  createdAt: string;
  balance: number;
}

// Representación guardada en LocalStorage (Simulación de BD)
export interface UserRecord extends User {
  password: string;
}

export interface RegisterFormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface ValidationErrors {
  fullName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  general?: string;
  cardNumber?: string;
  cardExpirationDate?: string;
  cardCvv?: string;
  cardOwner?: string;
  cardRecharge?: string;
}

export interface CardFormData {
  cardNumber: string;
  cardExpirationDate: string;
  cardCvv: string;
  cardOwner: string;
  cardRecharge: string;
  idUser: string;
  email: string;
}

export type ViewState = "register" | "login" | "welcome";
