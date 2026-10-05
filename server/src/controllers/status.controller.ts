import type { Request, Response } from 'express';
import type { ApiResponse, ResCardRecharge } from '../types/api.types.js';
import { randomInt, randomUUID  } from 'node:crypto';


/**
 * Obtiene el estado general del servidor y la API
 */
export const getSystemStatus = (req: Request, res: Response<ApiResponse<ResCardRecharge>>): Response<ApiResponse<ResCardRecharge>> => {
    // const uptimeInSeconds = Math.floor(process.uptime());
    let newDate = new Date().toISOString();
    const dateOfTransaction = new Date(newDate).toLocaleDateString('es-MX', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    try {
        return res.status(200).json({
            success: true,
            message: 'API en ejecución correctamente',
            data: {
                id: randomUUID(),
                status: 'Servicio en línea',
                status_detail: `Servicio respondiendo con normalidad.`,
                transaction_amount: 'No disponible',
                date_created: dateOfTransaction,
                authorization_code: 'No aplica',
                reference: 'No aplica',
                payer_id: 'No disponible',
                payer_email: 'No disponible',
                cardNumber: 'No disponible',
                cardCvv: 'No disponible'             
            }
        });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Error al obtener el estado del sistema';
        
        return res.status(500).json({
            success: false,
            message: errorMessage,
            data: {
                id: randomUUID(),
                status: 'No hay Servicio',
                status_detail: `No se puede conectar con el servicio. Intente más tarde.`,
                transaction_amount: 'No disponible',
                date_created: dateOfTransaction,
                authorization_code: 'No aplica',
                reference: 'No aplica',
                payer_id: 'No disponible',
                payer_email: 'No disponible',
                cardNumber: 'No disponible',
                cardCvv: 'No disponible'              
            }
        });
    }
};

/**
 * Ejemplo de endpoint POST que recibe datos del cliente
 */
export const postCardRecharge = (
    req: Request<{}>,
//   req: Request<{}, ApiResponse<ResCardRecharge>, RequestCardRecharge>,
  res: Response<ApiResponse<ResCardRecharge>>,
): Response<ApiResponse<ResCardRecharge>> => {
    // console.log('Datos recibidos en el backend:', req.body);
    let newDate = new Date().toISOString();
    const dateOfTransaction = new Date(newDate).toLocaleDateString('es-MX', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
    const generateCode = () => randomInt(1000, 10000).toString();

    const { cardNumber, cardExpirationDate, cardCvv, cardOwner, cardRecharge, idUser, email } = req.body;

    const expirationDate = cardExpirationDate.slice(0, 2) + "/" + cardExpirationDate.slice(2)

    //Validación exitosa
    if(parseInt(cardNumber) === 1234123412341234 && expirationDate === '12/26' && parseInt(cardCvv) === 543) {
        res.status(200).json({
            success: true,
            message: 'Operación aprobada',
            data: {
                id: randomUUID(),
                status: 'Autorizado',
                status_detail: `Transacción exitosa, recarga de $${cardRecharge} al títular ${cardOwner}`,
                transaction_amount: cardRecharge,
                date_created: dateOfTransaction,
                authorization_code: generateCode(),
                reference: 'Recarga SnailPay',
                payer_id: idUser,
                payer_email: email,
                cardNumber: cardNumber,
                cardCvv: cardCvv         
            }
        });
    } else {
        res.status(200).json({
            success: false,
            message: 'Tarjeta no autorizada, verifique los datos ingresados',
            data: {
                id: randomUUID(),
                status: 'No autorizado',
                status_detail: `Transacción sin éxito, recarga NO APLICADA al títular ${cardOwner}`,
                transaction_amount: cardRecharge,
                date_created: dateOfTransaction,
                authorization_code: 'No aplica',
                reference: 'Recarga SnailPay',
                payer_id: idUser,
                payer_email: email,
                cardNumber: cardNumber,
                cardCvv: cardCvv          
            }
        });
    }

    return res;
};