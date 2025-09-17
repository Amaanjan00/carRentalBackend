'use client'
import axios from "axios";
import { useEffect, useState } from "react"

export default function Page(){

    type Expenses = {
        _id: string;
        car: string;
        expenseDetails: string;
        expenseAmount: number;
        nameOfReceivingParty: string;
        dateOfExpense: string;
        modeOfPayment: string;
        categoryOfExpense: string;
    }

    const [expenses, setExpenses] = useState<Expenses[]>([])
    const [deleteId, setDeleteId] = useState<string | null>(null)

    useEffect(() => {
        const bills = axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/expenses`)
        .then((bills) => setExpenses(bills.data))
        .catch((err) => console.log("Error in getting bills data", err))
    }, [])

    useEffect(() => {
    if (!deleteId) return; // nothing to do

    let cancelled = false;

    const run = async () => {
        try {
            await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/expenses/${deleteId}`);
            if (cancelled) return;
            // Optimistically remove from UI
            setExpenses(prev => prev.filter(c => c._id !== deleteId));
        } catch (err) {
            console.error("Error deleting contract", err);
            // (Optional) show a toast or revert UI here
        } finally {
            if (!cancelled) setDeleteId(null); // reset trigger
        }
    };

        run();

        return () => { cancelled = true; };
    }, [deleteId]);

    return(
        <>
            <div>
                <div className="bg-red">

                    <div className="p-4 flex gap-4">

                        <div className="bg-blue-500 w-fit p-4 text-[16px] font-extrabold text-white">
                            Total number of expenses 
                            <p className="text-4xl px-2 py-1">{expenses.length}</p>
                        </div>

                    </div>

                    <div className="mt-5 flex flex-col gap-2">
                        <h1 className="px-5 font-bold text-3xl">List of Expenses</h1>

                        <div className="p-5">

                            <div className="bg-white border-2 shadow-md rounded-2xl">

                                <table>

                                    <thead className="w-full border-b-2">
                                        <tr>
                                            <th className="w-full p-2 text-left border-r-1">Details</th>
                                            <th className="p-2">Actions</th>
                                        </tr>
                                    </thead>

                                    <tbody>

                                        {expenses.map((c)=> (
                                            <tr key={c._id} className="border-b-1">

                                                <td className="px-4 border-r-1">
                                                    <div className="py-2">
                                                        
                                                        <div className="text-[14px]">

                                                            <p><span className="font-bold text-[12px]">Payment to: </span> {c.nameOfReceivingParty}</p>
                                                            <p><span className="font-bold text-[12px]">Date fo expense: </span>{c.dateOfExpense}</p>
                                                            <p><span className="font-bold text-[12px]">Expense Details: </span> {c.expenseDetails}</p>
                                                            <p><span className="font-bold text-[12px]">Mode of Payment: </span>{c.modeOfPayment}</p>
                                                            <p><span className="font-bold text-[12px]">Expense Amount: </span>{c.expenseAmount}</p>

                                                        </div>

                                                    </div>
                                                </td>

                                                <td className="px-4">
                                                    <div className="flex flex-col gap-2 py-4">
                                                        <button 
                                                            onClick={() => {
                                                                if (confirm("Are you sure you want to delete this bill?")) {
                                                                    setDeleteId(c._id);
                                                                }
                                                            }} 
                                                            className="bg-red-500 rounded-2xl px-4 font-bold text-white">Delete</button>
                                                    </div>
                                                </td>

                                            </tr>
                                        ))}


                                    </tbody>

                                </table>

                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}