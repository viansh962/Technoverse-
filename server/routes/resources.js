import express from 'express';
import { getResources, createResource } from '../controllers/resourceController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getResources);
router.post('/', authenticate, createResource);

export { router as resourcesRouter };