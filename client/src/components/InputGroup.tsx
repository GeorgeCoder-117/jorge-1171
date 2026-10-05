import type { ChangeEvent } from 'react';

interface InputGroupProps {
  label: string;
  name: string;
  type?: string;
  value: string | number;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  placeholder?: string;
  autoComplete?: string;
}

export const InputGroup = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  error,
  placeholder,
  autoComplete,
}: InputGroupProps) => {
  const inputId = `${name}-field`;

  return (
    <div className="input-group">
      <label className='input-label' htmlFor={inputId}>{label}</label>
      <input
        className='input-field'
        id={inputId}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${inputId}-error` : undefined}
      />
      {error && (
        <small id={`${inputId}-error`} className="error-text">
          {error}
        </small>
      )}
    </div>
  );
};
