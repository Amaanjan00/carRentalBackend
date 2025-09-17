import express from 'express';
import { getAllCustomers } from '../controllers/customers.controllers.js';

const customerRouter = express.Router();

// Define Routes
customerRouter.get('/', getAllCustomers)

export default customerRouter