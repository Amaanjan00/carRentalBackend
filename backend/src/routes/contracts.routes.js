import express from 'express';
import { createContract, deleteContract, getAllActiveContracts, getAllContracts, getContractById, updateContract, getAllInactiveContracts } from '../controllers/contracts.controllers.js';

const contractsRouter = express.Router();

// Define your contract routes here
contractsRouter.post('/', createContract);
contractsRouter.get('/', getAllContracts);
contractsRouter.get('/active', getAllActiveContracts);
contractsRouter.get('/inactive', getAllInactiveContracts);
contractsRouter.get('/:id', getContractById);
contractsRouter.put('/:id', updateContract);
contractsRouter.delete('/:id', deleteContract);

export default contractsRouter;