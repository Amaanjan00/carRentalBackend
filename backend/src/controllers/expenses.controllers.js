import { Expense } from "../models/expenses.model.js";

export const getAllExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find()
        res.status(200).json(expenses);
    } catch (error) {
        req.status(500).json("Error in getting expeses");
    }
}

export const createExpense = async (req, res) => {
    try {
        const payload = req.body;
        const data = await Expense.create(payload)
        res.status(201).json("Expense entered", data)
    } catch (error) {
        res.status(500).json("Error in creating contract")
    }
}