import express from 'express';
import { createFine, deleteFine, getAllFines, getFineById, updateFine } from '../controllers/fines.controllers.js';

const finesRouter = express.Router();

// Define your fine routes here
finesRouter.get('/', getAllFines);
finesRouter.get('/:id', getFineById);
finesRouter.post('/', createFine);
finesRouter.put('/:id', updateFine);
finesRouter.delete('/:id', deleteFine);

export default finesRouter;