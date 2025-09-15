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
    }

    const [contracts, setContracts] = useState<Contract[]>([])
    const [activeContracts, setActiveContracts] = useState<Contract[]>([])
    const [inactiveContracts, setInactiveContracts] = useState<Contract[]>([])
    const [deleteId, setDeleteId] = useState<string | null>(null)

    // NEW: edit state
    const [editId, setEditId] = useState<string | null>(null)
    const [editData, setEditData] = useState<Partial<Contract>>({})
    const [isSaving, setIsSaving] = useState<boolean>(false)

    useEffect(() => {
        const fetchContracts = async () => {
            const contracts = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/contracts`)
            .then((contracts) => setContracts(contracts.data))
            .catch((err) => console.log("Error in getting contracts data", err))
        }
        fetchContracts()
    })

    useEffect(() => {
        const fetchContracts = async () => {
            const contracts = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/contracts/active`)
            .then((contracts) => setActiveContracts(contracts.data))
            .catch((err) => console.log("Error in getting contracts data", err))
        }
        fetchContracts()
    })

    useEffect(() => {
        const fetchContracts = async () => {
            const contracts = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/contracts/inactive`)
            .then((contracts) => setInactiveContracts(contracts.data))
            .catch((err) => console.log("Error in getting contracts data", err))
        }
        fetchContracts()
    })

    useEffect(() => {
        if (!deleteId) return; // nothing to do

        let cancelled = false;

        const run = async () => {
            try {
                await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/contracts/${deleteId}`);
                if (cancelled) return;
                // Optimistically remove from UI
                setContracts(prev => prev.filter(c => c._id !== deleteId));
            } catch (err) {
                console.error("Error deleting contract", err);
            } finally {
                if (!cancelled) setDeleteId(null); // reset trigger
            }
        };

        run();

        return () => { cancelled = true; };
    }, [deleteId]);

    // ======== EDIT HELPERS (NEW) ========

    const startEdit = (c: Contract) => {
        setEditId(c._id);
        // choose only the fields you want editable (kept minimal)
        setEditData({
            customerName: c.customerName,
            amountPerDay: c.amountPerDay,
            depositAmount: c.depositAmount,
            contractDays: c.contractDays,
            contractStatus: c.contractStatus,
        });
    };

    const cancelEdit = () => {
        setEditId(null);
        setEditData({});
        setIsSaving(false);
    };

    const onFieldChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;

        // Convert number fields to numbers
        const numberFields = new Set([
            "amountPerDay",
            "depositAmount",
            "contractDays",
        ]);

        setEditData(prev => ({
            ...prev,
            [name]: numberFields.has(name) ? Number(value) : value,
        }));
    };

    const saveEdit = async () => {
        if (!editId) return;
        setIsSaving(true);
        try {
            const resp = await axios.put(
            `${process.env.NEXT_PUBLIC_API_URL}/api/contracts/${editId}`,
            editData
            );

            const updated = resp.data?.contract; // controller returns { message, contract }
            if (updated) {
            setContracts(prev => prev.map(c => (c._id === editId ? { ...c, ...updated } : c)));
            }

            setEditId(null);
            setEditData({});
        } catch (err) {
            console.error("Error saving contract", err);
        } finally {
            setIsSaving(false);
        }
    };


    return(
        <>
            <div>
                <div className="bg-red">
                    <div className="p-4 flex gap-4">

                        <div className="bg-blue-500 w-fit p-4 text-[16px] font-extrabold text-white">
                            Total number of contracts 
                            <p className="text-4xl px-2 py-1">{contracts.length}</p>
                        </div>

                        <div className="bg-green-500 w-fit p-4 text-[16px] font-extrabold text-white">
                            Total number of Active contracts 
                            <p className="text-4xl px-2 py-1">{activeContracts.length}</p>
                        </div>

                        <div className="bg-red-500 w-fit p-4 text-[16px] font-extrabold text-white">
                            Total number of Completed contracts 
                            <p className="text-4xl px-2 py-1">{inactiveContracts.length}</p>
                        </div>

                    </div>

                    <div className="mt-5 flex flex-col gap-2">
                        <h1 className="px-5 font-bold text-3xl">Contracts</h1>

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

                                        {contracts.map((c)=> {
                                            const isEditing = editId === c._id;

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
                                                                        <span className="font-bold text-[12px]">CUSTOMER NAME: </span>
                                                                        {isEditing ? (
                                                                            <input
                                                                                name="customerName"
                                                                                value={editData.customerName ?? ""}
                                                                                onChange={onFieldChange}
                                                                                className="border px-2 py-1 rounded"
                                                                            />
                                                                        ) : (
                                                                            <span>{c.customerName}</span>
                                                                        )}
                                                                    </p>

                                                                    {/* AMOUNT/DAY */}
                                                                    <p className="flex items-center gap-2">
                                                                        <span className="font-bold text-[12px]">AMOUNT/DAY: </span>
                                                                        {isEditing ? (
                                                                            <input
                                                                                name="amountPerDay"
                                                                                type="number"
                                                                                value={editData.amountPerDay ?? c.amountPerDay}
                                                                                onChange={onFieldChange}
                                                                                className="border px-2 py-1 rounded w-28"
                                                                            />
                                                                        ) : (
                                                                            <span>{c.amountPerDay}</span>
                                                                        )}
                                                                    </p>

                                                                    {/* DEPOSIT AMOUNT */}
                                                                    <p className="flex items-center gap-2">
                                                                        <span className="font-bold text-[12px]">DEPOSIT AMOUNT: </span>
                                                                        {isEditing ? (
                                                                            <input
                                                                                name="depositAmount"
                                                                                type="number"
                                                                                value={editData.depositAmount ?? c.depositAmount}
                                                                                onChange={onFieldChange}
                                                                                className="border px-2 py-1 rounded w-28"
                                                                            />
                                                                        ) : (
                                                                            <span>{c.depositAmount}</span>
                                                                        )}
                                                                    </p>

                                                                    {/* CONTRACT DAYS */}
                                                                    <p className="flex items-center gap-2">
                                                                        <span className="font-bold text-[12px]">CONTRACT DAYS: </span>
                                                                        {isEditing ? (
                                                                            <input
                                                                                name="contractDays"
                                                                                type="number"
                                                                                value={editData.contractDays ?? c.contractDays}
                                                                                onChange={onFieldChange}
                                                                                className="border px-2 py-1 rounded w-28"
                                                                            />
                                                                        ) : (
                                                                            <span>{c.contractDays}</span>
                                                                        )}
                                                                    </p>

                                                                    {/* CONTRACT STATUS */}
                                                                    <p className="flex items-center gap-2">
                                                                        <span className="font-bold text-[12px]">CONTRACT STATUS: </span>
                                                                        {isEditing ? (
                                                                            <select
                                                                                name="contractStatus"
                                                                                value={editData.contractStatus ?? c.contractStatus}
                                                                                onChange={onFieldChange}
                                                                                className="border px-2 py-1 rounded"
                                                                            >
                                                                                <option value="Ongoing">Ongoing</option>
                                                                                <option value="Completed">Completed</option>
                                                                                <option value="Cancelled">Cancelled</option>
                                                                            </select>
                                                                        ) : (
                                                                            <span>{c.contractStatus}</span>
                                                                        )}
                                                                    </p>
                                                                </div>

                                                                <div>
                                                                    <div className="bg-yellow-500 font-bold p-4 rounded-2xl">
                                                                        Number of days Remaining
                                                                        <p className="px-2 font-extrabold text-2xl">
                                                                            {c.amountPerDay ? (c.totalAmountRemaining / c.amountPerDay) : 0}
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

                                                <td className="px-4">
                                                    <div className="flex flex-col gap-2 py-4">
                                                        {!isEditing ? (
                                                            <>
                                                                <button
                                                                    className="bg-blue-500 rounded-2xl px-4 font-bold text-white"
                                                                    onClick={() => startEdit(c)}
                                                                >
                                                                    Edit
                                                                </button>
                                                                <button
                                                                    onClick={() => {
                                                                        if (confirm("Are you sure you want to delete this contract?")) {
                                                                            setDeleteId(c._id);
                                                                        }
                                                                    }}
                                                                    className="bg-red-500 rounded-2xl px-4 font-bold text-white"
                                                                >
                                                                    Delete
                                                                </button>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <button
                                                                    className="bg-green-600 rounded-2xl px-4 font-bold text-white disabled:opacity-60"
                                                                    onClick={saveEdit}
                                                                    disabled={isSaving}
                                                                >
                                                                    {isSaving ? "Saving..." : "Save"}
                                                                </button>
                                                                <button
                                                                    className="bg-gray-400 rounded-2xl px-4 font-bold text-white"
                                                                    onClick={cancelEdit}
                                                                    disabled={isSaving}
                                                                >
                                                                    Cancel
                                                                </button>
                                                            </>
                                                        )}
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
