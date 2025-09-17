'use client'
import axios from "axios";
import { useEffect, useState } from "react"

export default function Page(){

    type Contract = {
        _id: string;
        vehicleAgreementNumber: string;
        customerName: string;
        customerEmiratesID: string;
        customerPhone: string;
        customerEmail: string;
        customerAddress: string;
        customerDrivingLicense: string;
        contractStartDate: string;
        rentalType: string;
        rentalAmount: number;
        depositAmount: number;
        contractStatus: string;
        amountPerDay: number;
        contractDays: number;
        totalFineAmount: number;
        totalSalikAmount: number;
        totalAmountReceived: number;
        totalRentalAmount: number;
        totalContractAmount: number;
        totalAmountRemaining: number;
        updatedAt: string;
    }

    const [contracts, setContracts] = useState<Contract[]>([])
    const [activeContracts, setActiveContracts] = useState<Contract[]>([])
    const [inactiveContracts, setInactiveContracts] = useState<Contract[]>([])
    const [endContract, setendContract] = useState<string | null>(null)
    const [deleteContractid, setDeleteContractId] = useState<string | null>(null)


    // Fetch all contracts
    useEffect(() => {
        const fetchContracts = async () => {
            const contracts = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/contracts`)
            .then((contracts) => setContracts(contracts.data))
            .catch((err) => console.log("Error in getting contracts data", err))
        }
        fetchContracts()
    }, [])

    // Fetch all Active contracts
    useEffect(() => {
        const fetchContracts = async () => {
            const contracts = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/contracts/active`)
            .then((contracts) => setActiveContracts(contracts.data))
            .catch((err) => console.log("Error in getting contracts data", err))
        }
        fetchContracts()
    }, [])

    // Fetch all Inactive contracts
    useEffect(() => {
        const fetchContracts = async () => {
            const contracts = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/contracts/inactive`)
            .then((contracts) => setInactiveContracts(contracts.data))
            .catch((err) => console.log("Error in getting contracts data", err))
        }
        fetchContracts()
    }, [])

    // Patch and change status to "Completed"
    useEffect(() => {
        if (!endContract) return; // nothing to do

        let cancelled = false;

        const run = async () => {
            try {
                const { data } = await axios.patch(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/contracts/cancel-contract`,
                    { _id: endContract } // <-- send the id
                );
                if (cancelled) return;
                // Optimistically remove from UI
                setContracts(prev =>
                    prev.map(c => c._id === endContract ? { ...c, contractStatus: 'Completed' } : c)
                );
            } catch (err) {
                console.error("Error completing contract", err);
            } finally {
                if (!cancelled) setendContract(null); // reset trigger
            }
        };

        run();

        return () => { cancelled = true; };
    }, [endContract]);

    // Delete a contract
    useEffect(() => {
        if (!deleteContractid) return;

        let cancelled = false;

        const deletecontract = async () => {
            try {
                await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/contracts/${deleteContractid}`)
                if (cancelled) return

                setContracts(prev => prev.filter(c => c._id !== deleteContractid));
            } catch (error) {
                console.log("Error in deleting contract!", error);
            }
        }

        deletecontract();

        return () => { cancelled = true; };
    }, [deleteContractid])


    return(
        <>
            <div>
                <div className="bg-red">
                    <div className="p-4 flex gap-4">

                        <a href="/contracts"><div className="bg-blue-500 w-fit p-4 text-[16px] font-extrabold text-white">
                            Total number of contracts 
                            <p className="text-4xl px-2 py-1">{contracts.length}</p>
                        </div></a>

                        <a href="/contracts/active"><div className="bg-green-500 w-fit p-4 text-[16px] font-extrabold text-white">
                            Total number of Active contracts 
                            <p className="text-4xl px-2 py-1">{activeContracts.length}</p>
                        </div></a>

                        <a href="/contracts/completed"><div className="bg-red-500 w-fit p-4 text-[16px] font-extrabold text-white">
                            Total number of Completed contracts 
                            <p className="text-4xl px-2 py-1">{inactiveContracts.length}</p>
                        </div></a>

                    </div>

                    <div className="mt-5 flex flex-col gap-2">
                        <h1 className="px-5 font-bold text-3xl">Contracts</h1>

                        <div className="p-5">

                            <div className="bg-white border-2 shadow-md rounded-2xl">

                                <table>

                                    <thead className="border-b-2">
                                        <tr>
                                            <th className="w-full p-2 text-left border-r-1">Details</th>
                                            <th className="p-2">Actions</th>
                                        </tr>
                                    </thead>

                                    <tbody>

                                        {inactiveContracts.map((c)=> {

                                            return (
                                            <tr key={c._id} className="border-b-1">

                                                <td className="px-4 border-r-1">
                                                    <div className="py-2">
                                                        <h1 className="uppercase font-bold">
                                                            <span className="text-blue-500">AGREEMENT NUMBER: </span>{c.vehicleAgreementNumber}
                                                        </h1>

                                                        <div className="text-[14px]">

                                                            <div className="flex justify-between">
                                                                <div>
                                                                    {/* CUSTOMER NAME */}
                                                                    <p className="flex items-center gap-2">
                                                                        <span className="font-bold text-[12px]">CUSTOMER NAME: </span><span>{c.customerName}</span>
                                                                    </p>

                                                                    {/* AMOUNT/DAY */}
                                                                    <p className="flex items-center gap-2">
                                                                        <span className="font-bold text-[12px]">AMOUNT/DAY: </span><span>{c.amountPerDay}</span>
                                                                    </p>

                                                                    {/* DEPOSIT AMOUNT */}
                                                                    <p className="flex items-center gap-2">
                                                                        <span className="font-bold text-[12px]">DEPOSIT AMOUNT: </span><span>{c.depositAmount}</span>
                                                                    </p>

                                                                    {/* CONTRACT DAYS */}
                                                                    <p className="flex items-center gap-2">
                                                                        <span className="font-bold text-[12px]">CONTRACT DURATION: </span><span>{c.contractDays} Days</span>
                                                                    </p>

                                                                    {/* CONTRACT STATUS */}
                                                                    <p className="flex items-center gap-2">
                                                                        <span className="font-bold text-[12px]">CONTRACT STATUS: </span><span>{c.contractStatus}</span>
                                                                    </p>

                                                                    {/* UPDATED AT */}
                                                                    <p className="flex items-center gap-2">
                                                                        <span className="font-bold text-[12px]">Updated at: </span><span>{c.updatedAt}</span>
                                                                    </p>
                                                                </div>

                                                                <div>
                                                                    <div>
                                                                        <p className="px-2 text-[16px] font-bold">
                                                                            {c.amountPerDay ? (
                                                                                (() => {
                                                                                const daysRemaining = Math.floor(c.totalAmountReceived / c.amountPerDay - c.contractDays);

                                                                                if (daysRemaining > 0) {
                                                                                    return <span className="bg-green-400 p-4 rounded-2xl">{daysRemaining} days remaining</span>;
                                                                                } else if (daysRemaining < 0) {
                                                                                    return <span className="bg-red-400 p-4 rounded-2xl">{Math.abs(daysRemaining)} days overdue</span>;
                                                                                } else {
                                                                                    return "No days remaining";
                                                                                }
                                                                                })()
                                                                            ) : (
                                                                                "N/A"
                                                                            )}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-2 items-center justify-between gap-2 mt-2">

                                                                <div className="flex flex-col gap-1 items-center w-full justify-center bg-blue-300 p-4 border-2">
                                                                    <h2 className="text-[12px] font-bold">Total Fine Amount</h2>
                                                                    <p className="text-[16px] font-bold text-white">AED {c.totalFineAmount}</p>
                                                                </div>

                                                                <div className="flex flex-col gap-1 items-center w-full justify-center bg-blue-300 p-4 border-2">
                                                                    <h2 className="text-[12px] font-bold">Total Salik Amount</h2>
                                                                    <p className="text-[16px] font-bold text-white">AED {c.totalSalikAmount}</p>
                                                                </div>

                                                                <div className="flex flex-col gap-1 items-center w-full justify-center bg-blue-300 p-4 border-2">
                                                                    <h2 className="text-[12px] font-bold">Total Amount Received</h2>
                                                                    <p className="text-[16px] font-bold text-white">AED {c.totalAmountReceived}</p>
                                                                </div>

                                                                <div className="flex flex-col gap-1 items-center w-full justify-center bg-blue-300 p-4 border-2">
                                                                    <h2 className="text-[12px] font-bold">Total Rental Amount</h2>
                                                                    <p className="text-[16px] font-bold text-white">AED {c.totalRentalAmount}</p>
                                                                </div>

                                                                <div className="flex flex-col gap-1 items-center w-full justify-center bg-blue-300 p-4 border-2">
                                                                    <h2 className="text-[12px] font-bold">Total Contract Amount</h2>
                                                                    <p className="text-[16px] font-bold text-white">AED {c.totalContractAmount}</p>
                                                                </div>

                                                                <div className="flex flex-col gap-1 items-center w-full justify-center bg-blue-300 p-4 border-2">
                                                                    <h2 className="text-[12px] font-bold">Total Amount Remaining</h2>
                                                                    <p className="text-[16px] font-bold text-white">AED {c.totalAmountRemaining}</p>
                                                                </div>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>

                                                <td className="px-4 text-[12px]">
                                                    <div className="flex flex-col gap-2 py-4">

                                                        {c.contractStatus === "Completed" ? (
                                                            <button
                                                            disabled
                                                            onClick={() => {
                                                                if (confirm("Are you sure you want to end this contract?")) {
                                                                    setendContract(c._id);
                                                                }
                                                            }} 
                                                            className="bg-gray-400 rounded-2xl px-4 font-bold text-white">
                                                            End Contract
                                                        </button>
                                                        ) : (
                                                            <button
                                                            onClick={() => {
                                                                if (confirm("Are you sure you want to end this contract?")) {
                                                                    setendContract(c._id);
                                                                }
                                                            }} 
                                                            className="bg-blue-400 rounded-2xl px-4 font-bold text-white">
                                                            End Contract
                                                        </button>
                                                        )}

                                                        <button 
                                                            onClick={() => {
                                                                if (confirm("Are you sure you want to delete this contract?")) {
                                                                    setDeleteContractId(c._id);
                                                                }
                                                            }} 
                                                            className="bg-red-500 rounded-2xl px-4 font-bold text-white">
                                                            Delete Contract
                                                        </button>
                                                    </div>
                                                </td>

                                            </tr>
                                            );
                                        })}

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
