// Interfaz genérica para respuestas de la API
export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  receivedData?: T;
//   error?: string;
}

// Interfaz de respuesta para el estado del sistema, error de transacción y transacción exitosa
export interface ResCardRecharge {
  id: string;
  status: string;
  status_detail: string;
  transaction_amount: string;
  date_created: string;
  authorization_code: string;
  reference: string;
  payer_id: string;
  payer_email: string;
  cardNumber: string;
  cardCvv: string;
}















// Interfaz para el cuerpo recibido en la prueba POST
// export interface RequestCardRecharge {
//     cardNumber: string;
//     cardExpirationDate: string;
//     cardCvv: string;
//     cardOwner: string;
//     cardRecharge: string;
//     id: string;
//     email: string;
// }