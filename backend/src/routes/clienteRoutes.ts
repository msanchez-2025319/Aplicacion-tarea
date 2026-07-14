import { Router } from 'express';
import { ClienteController } from '../controllers/ClienteController';

const router = Router();
const clienteController = new ClienteController();

router.get('/clientes', (req, res) => clienteController.obtenerTodos(req, res));
router.post('/clientes', (req, res) => clienteController.agregar(req, res));

export default router;