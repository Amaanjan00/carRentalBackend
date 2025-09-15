'use client'
import axios from "axios";
import { useEffect, useState } from "react"

export default function Page(){

    type BillReceived = {
        _id: string;
        vehicleAgreementId: string;
        vehicleAgreementNumber: string;
        amountreceived: number;
        receivedby: string;
        paymentmode: string;
    }

    const [billsreceived, setBillsreceived] = useState<BillReceived[]>([])
    const [deleteId, setDeleteId] = useState<string | null>(null)

    useEffect(() => {
        const bills = axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/billsreceiving`)
        .then((bills) => setBillsreceived(bills.data))
        .catch((err) => console.log("Error in getting bills data", err))
    })

    useEffect(() => {
    if (!deleteId) return; // nothing to do

    let cancelled = false;

    const run = async () => {
        try {
            await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/billsreceiving/${deleteId}`);
            if (cancelled) return;
            // Optimistically remove from UI
            setBillsreceived(prev => prev.filter(c => c._id !== deleteId));
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
                    <div className="bg-blue-500">Total number of Bills Received: {billsreceived.length}</div>

                    <div className="mt-5 flex flex-col gap-2">
                        <h1 className="px-5 font-bold text-3xl">Bills Received</h1>

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

                                        {billsreceived.map((c)=> (
                                            <tr key={c._id} className="border-b-1">

                                                <td className="px-4 border-r-1">
                                                    <div className="py-2">
                                                        <h1 className="uppercase font-bold"><span className="text-blue-500">AGREEMENT NUMBER: </span>
                                                            {
                                                                typeof c.vehicleAgreementId === 'object' && c.vehicleAgreementId !== null
                                                                        ? (c.vehicleAgreementId as any).vehicleAgreementNumber
                                                                        : ''
                                                            }
                                                        </h1>
                                                        <div className="text-[14px]">

                                                            <p><span className="font-bold text-[12px]">AMOUNT RECEIVED: </span> {c.amountreceived}</p>
                                                            <p><span className="font-bold text-[12px]">RECEIVED BY: </span>{c.receivedby}</p>
                                                            <p><span className="font-bold text-[12px]">MODE OF PAYMENT: </span>{c.paymentmode}</p>

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