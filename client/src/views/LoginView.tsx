import { useState, type ChangeEvent, type FormEvent } from 'react';

import { useAuth } from '../hooks/useAuth';
import type { LoginFormData, ValidationErrors } from '../types/auth';

import { validateLoginForm } from '../utils/validators';

import { InputGroup } from '../components/InputGroup';
import { GeneralButton } from '../components/GeneralButton';

const initialFormData: LoginFormData = {
  email: '',
  password: '',
};

export const LoginView = () => {
  const { login, navigateTo, isLoading } = useAuth();

  const [formData, setFormData] = useState<LoginFormData>(initialFormData);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [fatalError, setFatalError] = useState<string | null>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const fieldName = name as keyof LoginFormData;

    setFormData((prev) => ({ ...prev, [fieldName]: value }));

    if (errors[fieldName]) {
      setErrors((prev) => ({ ...prev, [fieldName]: undefined }));
    }

    setFatalError(null);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationErrors = validateLoginForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    try {
      await login(formData);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setFatalError(err.message);
      } else {
        setFatalError('Error al iniciar sesión.');
      }
    }
  };

  return (
    <div className="auth-card">
      <h1 className='titleCard'>Iniciar Sesión</h1>
      <h4 className='subtitleCard'>Ingresa tus credenciales registradas.</h4>

      {fatalError && <div className="error-message">{fatalError}</div>}

      <form onSubmit={handleSubmit} noValidate>
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
          autoComplete="current-password"
        />

        <GeneralButton loading={isLoading} view="login" />
      </form>

      <p>
        ¿Aún no tienes cuenta?{' '}
        <button type="button" className="btn-link" onClick={() => navigateTo('register')}>
          Regístrate aquí
        </button>
      </p>
    </div>
  );
};