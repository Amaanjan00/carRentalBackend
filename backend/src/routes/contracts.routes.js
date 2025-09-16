import express from 'express';
import { createContract, deleteContract, getAllActiveContracts, cancelContract, getAllContracts, getContractById, updateContract, getAllInactiveContracts } from '../controllers/contracts.controllers.js';

const contractsRouter = express.Router();

// Define your contract routes here
contractsRouter.post('/', createContract);
contractsRouter.get('/', getAllContracts);
contractsRouter.get('/active', getAllActiveContracts);
contractsRouter.get('/inactive', getAllInactiveContracts);
contractsRouter.get('/:id', getContractById);
contractsRouter.put('/:id', updateContract);
contractsRouter.patch('/cancel-contract', cancelContract);
contractsRouter.delete('/:id', deleteContract);

export default contractsRouter;