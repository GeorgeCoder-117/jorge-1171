import { Router } from 'express';
import { getSystemStatus, postCardRecharge } from '../controllers/status.controller.js';

const router = Router();

// Ruta GET /api/v1/status
router.get('/status', getSystemStatus);

// Ruta POST /api/v1/status/echo
router.post('/recharge', postCardRecharge);

export default router;