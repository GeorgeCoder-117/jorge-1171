import express, { Request, Response, Application } from 'express';
import cors, { CorsOptions } from 'cors';
import statusRoutes from './routes/status.routes.js';

const app: Application = express();

// 1. Configuración de Puerto
const PORT: number | string = process.env.PORT || 3000;

// 2. Permitir dominios mediante CORS
const allowedOrigins: string[] = [
  process.env.CLIENT_URL || 'http://localhost:5173',
];

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    // Permitir solicitudes sin origen o si está en la lista de permitidos
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Bloqueado por la política de CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));

// 3. Middlewares para parsear JSON y datos de formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 4. Importación y Registro de Rutas
app.use('/api/v1', statusRoutes);

// 5. Ruta genérica de verificación del servidor
app.get('/', (_req: Request, res: Response) => {
  res.status(200).send('Servidor Express activo con TypeScript');
});

// 6. Middleware para manejo de rutas no encontradas (404)
app.use((_req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'La ruta solicitada no existe',
  });
});

// 7. Iniciar el servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  console.log(`📡 API lista en http://localhost:${PORT}/api/v1/status`);
});