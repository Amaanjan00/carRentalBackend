import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema(
    {
        car: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Car'
        },
        expenseAmount: {
            type: Number,
            min: 0,
            required: true
        },
        expenseDetails: {
            type: String,
            required: true
        },
        nameOfReceivingParty: {
            type: String,
            required: true
        },
        dateOfExpense: {
            type: Date,
            required: true
        },
        modeOfPayment: {
            type: String,
            enum: [
                "Cash",
                "Card",
                "Online"
            ],
            required: true
        },
        categoryOfExpense: {
            type: String,
            enum: [
                'Travelling Expenses (E-01)',
                'Petrol Expenses (E-02)',
                'Garage Expenses (E-03)',
                'Marketing Expenses (E-04)',
                'Office Expenses (E-05)',
                'DEWA Expenses (E-06)',
                'Fine Payments (E-07)',
                'Car Passing Expenses (E-08)',
                'Telephone Expenses (E-09)',
                'Loan Installment (E-10)',
                'Deposit Return (E-11)',
                'Car Washing Expenses (E-12)',
                'RTA Expenses (E-13)',
                'Car Tracker Expenses (E-14)',
                'Salary Expenses (E-15)',
                'Bank Charges (E-16)',
                'Driving License Expenses (E-17)',
                'Salik Expenses (E-18)',
                'Insurance Expenses (E-19)',
                'Rent (E-20)',
                'Other Expenses (E-99)'
            ]
        }
    }, 
    {timestamps: true}
)

export const Expense = mongoose.model('Expense', expenseSchema)