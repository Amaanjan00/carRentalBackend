import express from 'express';
import { createExpense, getAllExpenses } from '../controllers/expenses.controllers.js';

const expensesRouter = express.Router();

// Routes

expensesRouter.get('/', getAllExpenses);
expensesRouter.post('/', createExpense);

export default expensesRouter;