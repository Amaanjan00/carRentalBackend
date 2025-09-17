import { Expense } from "../models/expenses.model.js";

export const getAllExpenses = async (req, res) => {
    try {
        const expenses = await Expense.aggregate(
            [
                {
                    $lookup: {
                    from: "cars",
                    localField: "car",
                    foreignField: "_id",
                    as: "car",
                    pipeline: [
                        {
                        $project: {
                            carPlateNo: 1,
                            carModel: 1,
                            carBrand: 1
                        }
                        }
                    ]
                    }
                },
                {
                    $addFields: {
                    car: {
                        $arrayElemAt: ["$car", 0]
                    }
                    }
                }
            ]
        )
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

export const deleteExpense = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedExpense = await Expense.findByIdAndDelete(id)
        if (!deletedExpense) {
            return res.status(404).json({ error: 'Contract not found' });
        }
        res.status(200).json("Deleted Expense", deletedExpense)
    } catch (error) {
        res.status(500).json("Error in deleting expense")
    }
}