import express from 'express';
import { createExpense, deleteExpense, getAllExpenses } from '../controllers/expenses.controllers.js';

const expensesRouter = express.Router();

// Routes

expensesRouter.get('/', getAllExpenses);
expensesRouter.post('/', createExpense);
expensesRouter.delete('/:id', deleteExpense);

export default expensesRouter;