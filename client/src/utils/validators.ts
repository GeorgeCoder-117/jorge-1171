import type { RegisterFormData, LoginFormData, CardFormData, ValidationErrors } from '../types/auth';

// Expresión regular estándar para formato válido de email
export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const validateRegisterForm = (data: RegisterFormData): ValidationErrors => {
  const errors: ValidationErrors = {};

  if (!data.fullName.trim()) {
    errors.fullName = 'El nombre completo es obligatorio.';
  } else if (data.fullName.trim().length < 3) {
    errors.fullName = 'El nombre debe contener al menos 3 caracteres.';
  }

  if (!data.email.trim()) {
    errors.email = 'El correo electrónico es obligatorio.';
  } else if (!EMAIL_REGEX.test(data.email.trim())) {
    errors.email = 'El formato del correo electrónico no es válido.';
  }

  if (!data.password) {
    errors.password = 'La contraseña es obligatoria.';
  } else if (data.password.length < 6) {
    errors.password = 'La contraseña debe tener al menos 6 caracteres.';
  }

  if (!data.confirmPassword) {
    errors.confirmPassword = 'Debes confirmar la contraseña.';
  } else if (data.password !== data.confirmPassword) {
    errors.confirmPassword = 'Las contraseñas no coinciden.';
  }

  return errors;
};

export const validateLoginForm = (data: LoginFormData): ValidationErrors => {
  const errors: ValidationErrors = {};

  if (!data.email.trim()) {
    errors.email = 'El correo electrónico es obligatorio.';
  } else if (!EMAIL_REGEX.test(data.email.trim())) {
    errors.email = 'Ingresa un correo electrónico válido.';
  }

  if (!data.password) {
    errors.password = 'La contraseña es obligatoria.';
  }

  return errors;
};

export const validateCardForm = (data: CardFormData): ValidationErrors => {
  const errors: ValidationErrors = {};

  if (!data.cardNumber) {
    errors.cardNumber = 'El número de tarjeta es obligatorio.';
  } else if (data.cardNumber.length !== 16) {
    errors.cardNumber = 'El número de tarjeta debe tener 16 dígitos.';
  }

  if (!data.cardExpirationDate) {
    errors.cardExpirationDate = 'La fecha de expiración de la tarjeta es obligatoria.';
  } else if (data.cardExpirationDate.length !== 4) {
    errors.cardExpirationDate = 'La fecha de vencimiento de la tarjeta debe tener 4 dígitos.';
  }

  if (!data.cardCvv) {
    errors.cardCvv = 'El número de CVV de la tarjeta es obligatorio.';
  } else if (data.cardCvv.length !== 3) {
    errors.cardCvv = 'El número de CVV de la tarjeta debe tener 3 dígitos.';
  }

  if (!data.cardOwner.trim()) {
    errors.cardOwner = 'El nombre del titular de la tarjeta es obligatorio.';
  }

  if (!data.cardRecharge) {
    errors.cardRecharge = 'El monto de la recarga a la tarjeta es obligatorio.';
  } else if(data.cardRecharge === '0') {
    errors.cardRecharge = 'El monto de la recarga debe ser mayor a 0.';
  } else if(Number(data.cardRecharge) > 50000) {
    errors.cardRecharge = 'El monto de la recarga no debe ser mayor a 50000.';
  } else if(data.cardRecharge.includes('.')) {
    errors.cardRecharge = 'El monto de la recarga a la tarjeta solo acepta números enteros.';
  }

  return errors;
};

