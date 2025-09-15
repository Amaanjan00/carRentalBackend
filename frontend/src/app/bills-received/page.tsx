'use client'
import axios from "axios";
import { useEffect, useState } from "react"

export default function Page(){

    type BillReceived = {
        _id: string;
        vehicleAgreementNo: string;
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
            await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/cars/${deleteId}`);
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
                                                        <h1 className="uppercase font-bold"><span className="text-blue-500">AGREEMENT NUMBER: </span>{c.vehicleAgreementNo}</h1>
                                                        <div className="text-[14px]">

                                                            <p><span className="font-bold text-[12px]">AMOUNT RECEIVED: </span> {c.amountreceived}</p>
                                                            <p><span className="font-bold text-[12px]">RECEIVED BY: </span>{c.receivedby}</p>
                                                            <p><span className="font-bold text-[12px]">MODE OF PAYMENT: </span>{c.paymentmode}</p>

                                                            {/* <div className="grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-2 items-center justify-between gap-2 mt-2">

                                                                <div className="flex flex-col gap-1 items-center w-full justify-center bg-blue-300 p-4 border-2">
                                                                    <h2 className="text-[12px] font-bold">Total Fine Amount</h2>
                                                                    <p className="text-[16px] font-bold text-white">AED {c.totalFineAmount}</p>
                                                                </div>

                                                                <div className="flex flex-col gap-1 items-center w-full justify-center bg-blue-300 p-4 border-2">
                                                                    <h2 className="text-[12px] font-bold">Total Salik Amount</h2>
                                                                    <p className="text-[16px] font-bold text-white">{c.totalSalikAmount}</p>
                                                                </div>

                                                                <div className="flex flex-col gap-1 items-center w-full justify-center bg-blue-300 p-4 border-2">
                                                                    <h2 className="text-[12px] font-bold">Total Amount Received</h2>
                                                                    <p className="text-[16px] font-bold text-white">{c.totalAmountReceived}</p>
                                                                </div>

                                                                <div className="flex flex-col gap-1 items-center w-full justify-center bg-blue-300 p-4 border-2">
                                                                    <h2 className="text-[12px] font-bold">Total Rental Amount</h2>
                                                                    <p className="text-[16px] font-bold text-white">{c.totalRentalAmount}</p>
                                                                </div>

                                                                <div className="flex flex-col gap-1 items-center w-full justify-center bg-blue-300 p-4 border-2">
                                                                    <h2 className="text-[12px] font-bold">Total Contract Amount</h2>
                                                                    <p className="text-[16px] font-bold text-white">{c.totalContractAmount}</p>
                                                                </div>

                                                                <div className="flex flex-col gap-1 items-center w-full justify-center bg-blue-300 p-4 border-2">
                                                                    <h2 className="text-[12px] font-bold">Total Amount Remaining</h2>
                                                                    <p className="text-[16px] font-bold text-white">{c.totalAmountRemaining}</p>
                                                                </div>

                                                            </div> */}
                                                        </div>
                                                    </div>
                                                </td>

                                                <td className="px-4">
                                                    <div className="flex flex-col gap-2 py-4">
                                                        <button className="bg-blue-500 rounded-2xl px-4 font-bold text-white">Edit</button>
                                                        <button 
                                                            onClick={() => {
                                                                if (confirm("Are you sure you want to delete this contract?")) {
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