import express from 'express';
import { createContract, deleteContract, getAllContracts, getContractById, updateContract } from '../controllers/contracts.controllers.js';

const contractsRouter = express.Router();

// Define your contract routes here
contractsRouter.post('/', createContract);
contractsRouter.get('/', getAllContracts);
contractsRouter.get('/:id', getContractById);
contractsRouter.put('/:id', updateContract);
contractsRouter.delete('/:id', deleteContract);

export default contractsRouter;