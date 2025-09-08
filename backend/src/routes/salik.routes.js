import express from 'express';
import { createSalik, deleteSalik, getAllSalik, getSalikById, updateSalik } from '../controllers/salik.controllers.js';

const salikRouter = express.Router();

// Define your salik routes here
salikRouter.get('/', getAllSalik);
salikRouter.get('/:id', getSalikById);
salikRouter.post('/', createSalik);
salikRouter.put('/:id', updateSalik);
salikRouter.delete('/:id', deleteSalik);

export default salikRouter;