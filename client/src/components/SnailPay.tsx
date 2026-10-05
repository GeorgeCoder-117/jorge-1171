import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";

import type { CardFormData, ValidationErrors } from "../types/auth";
import { validateCardForm } from "../utils/validators";

import { InputGroup } from "./InputGroup";
import { ConfirmButton } from "./ConfirmButton";

import type { LoadData } from "../types/api";
import { apiClient } from "../services/apiService";

import { useAuth } from "../hooks/useAuth";

export const SnailPay = () => {
  const { user, recharge, isLoading } = useAuth();
  const [status, setStatus] = useState<LoadData | null>(null);
  const [loading, setLoading] = useState(true);

  const initialFormData: CardFormData = {
    cardNumber: "",
    cardExpirationDate: "",
    cardCvv: "",
    cardOwner: "",
    cardRecharge: "",
    idUser: user?.id as string,
    email: user?.email as string,
  };
  const [formData, setFormData] = useState<CardFormData>(initialFormData);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [apiError, setApiError] = useState<string | null>(null);
  const [apiSuccess, setApiSuccess] = useState<string | null>(null);
  const [detail, setDetail] = useState<LoadData | null>(null);

  useEffect(() => {
    const loadServiceStatus = async () => {
      try {
        const response = await apiClient.getStatus<LoadData>();
        setStatus(response.data ?? null);
      } catch (error) {
        console.error("Error al conectar con la API:", error);
        setStatus(null);
      } finally {
        setLoading(false);
      }
    };

    void loadServiceStatus();
  }, [status]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const fieldName = name as keyof CardFormData;

    setFormData((prev) => ({ ...prev, [fieldName]: value }));

    if (fieldName !== "idUser" && fieldName !== "email") {
      if (errors[fieldName]) {
        setErrors((prev) => ({ ...prev, [fieldName]: undefined }));
      }
    }

    setApiError(null);
    setApiSuccess(null);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationErrors = validateCardForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    try {
      const response = await apiClient.postData<LoadData>(formData);
      console.log(response);
      
      if(response.success) {
        await recharge(response.data as LoadData);
        setApiSuccess(response.message);
        setDetail(response.data ?? null)
      } else {
        //Guardamos CardNumber y CVV
        const cardInfo = {
            number: formData.cardNumber,
            cvv: formData.cardCvv
        }
        localStorage.setItem('card', JSON.stringify(cardInfo))
        setApiError(response.message);
      }        

      setFormData(initialFormData); // Reset form data after successful submission
    } catch (error) {
      console.error("Error al conectar con la API:", error);
      setStatus(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ width: "365px" }}>
      {loading ? (
        <h2>Cargando estado del servidor...</h2>
      ) : status ? (
        <>
            {apiError && <div className="error-message">{apiError}</div>}

            <form onSubmit={handleSubmit} noValidate>
                <InputGroup
                    label="Número de tarjeta"
                    name="cardNumber"
                    type="number"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    error={errors.cardNumber}
                    placeholder="Escriba su número de tarjeta de 16 dígitos"
                />

                <InputGroup
                    label="Fecha de expiración"
                    name="cardExpirationDate"
                    type="number"
                    value={formData.cardExpirationDate}
                    onChange={handleChange}
                    error={errors.cardExpirationDate}
                    placeholder="Ejemplo: escriba 1226, en vez de 12/26"
                />

                <InputGroup
                    label="CVV de su tarjeta"
                    name="cardCvv"
                    type="number"
                    value={formData.cardCvv}
                    onChange={handleChange}
                    error={errors.cardCvv}
                    placeholder="Ejemplo: 234 (Número al reverso de tarjeta)"
                />

                <InputGroup
                    label="Nombre completo (Titular de la tarjeta)"
                    name="cardOwner"
                    type="text"
                    value={formData.cardOwner}
                    onChange={handleChange}
                    error={errors.cardOwner}
                    placeholder="Juan Perez Galindez"
                    autoComplete="cardOwner"
                />

                <InputGroup
                    label="Monto de recarga"
                    name="cardRecharge"
                    type="number"
                    value={formData.cardRecharge}
                    onChange={handleChange}
                    error={errors.cardRecharge}
                    placeholder="Monto de recarga... 100, 200, 500 etc"
                />

                <br />
                <ConfirmButton loading={isLoading} name="Recargar" />
                {apiSuccess && (
                    <div className="success">
                        <h4>{apiSuccess}</h4>
                        <p className="success-message">{detail?.status_detail}</p>
                    </div>
                )}
            </form>
        </>
      ) : (
        <>
          <h2>Sin servicio (No se pudo conectar)</h2>
          <br />
          <h4>Intente de nuevo más tarde en lo que se recupera el servicio.</h4>
        </>
      )}
    </div>
  );
};
