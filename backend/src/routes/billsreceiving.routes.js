import express from 'express';
import { createBillReceiving, deleteBillReceiving, getAllBillsReceiving, getBillReceivingById, updateBillReceiving } from '../controllers/billsreceiving.controllers.js';

const billsReceivingRouter = express.Router();

// Define your bills receiving routes here
billsReceivingRouter.get('/', getAllBillsReceiving);
billsReceivingRouter.get('/:id', getBillReceivingById);
billsReceivingRouter.post('/', createBillReceiving);
billsReceivingRouter.put('/:id', updateBillReceiving);
billsReceivingRouter.delete('/:id', deleteBillReceiving);

export default billsReceivingRouter;