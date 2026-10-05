# React + TypeScript + Vite

## Pruebas

Ir al archivo vite.config.ts

comentar esta línea : import { defineConfig } from 'vite'

y descomentar las líneas comentadas para habilitar vitest

// import { defineConfig } from 'vitest/config'

// test: {
//   globals: true,
//   environment: 'jsdom',
//   setupFiles: './src/setupTests.ts', // Archivo para extensiones de assertions
// },

Una vez hecho esto si no esta creado en client/src/setupTests.ts , crearla y poner esto : import '@testing-library/jest-dom';

De ahí verificar en el package.json de client que en la parte de scripts este esto: "test": "vitest"

Una vez hecho todo en la terminal del client ejecutar: npm run test 

## REPRODUCIR RESPUESTAS SIMULADAS CON SNAILPAY

En cuanto a la respuesta de Error en la transacción (Tarjeta rechazada) :

Solo hay que pasar todas las validaciones del lado del front end en el formulario de SnailPay, 
apareceran mensajes de error abajo de los inputs que nos dirán el como escribir los datos correctamente.

Una vez superado estas validaciones, solo es cuestión de poner otro número de tarjeta distinto al único num de tarjeta exitoso,
y lo mismo para el CVV y para la fecha de expiración.

Ya que por lo que entendí una respuesta EXITOSA solo será valida si :

● Número de tarjeta: 1234123412341234 
● Fecha de vencimiento: 12/26 
● CVV: 543 
● Nombre completo: cualquier valor no vacío. 
● Monto: cualquier cantidad válida mayor que cero. 

# ERROR DE SISTEMA SNAILPAY

Aquí yo cambie un poco la lógica, ya que en el pdf dice: 

Deberá existir una forma de simular que SnailPay tiene un problema interno y no puede 
procesar solicitudes. 
Durante esta simulación no deberá aprobarse ni aplicarse ninguna recarga.

Con esto se da a entender que al querer aplicar una recarga por alguna razón el servicio esta caído o hay algún problema interno.

Pero lo que yo hago es que al dar click en la opción para recargar saldo en SnailPay, 
antes de mandar los datos bancarios mando a llamar al servicio para ver si esta activo y en funcionamiento,
SI NO inhabilito el formulario para que puedan hacer alguna recarga y así evito que la hagan, ni que se apruebe.

Para reproducir el error basta con cambiar la ruta, o el puerto, o la url base de la api.
