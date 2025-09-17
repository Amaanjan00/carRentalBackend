'use client'
import axios from "axios";
import { useEffect, useState } from "react"

export default function Page(){

    type Car = {
        _id: string;
        carPlateNo: string;
        carModel: string;
        carColor: string;
        carBrand: string;
        chassisNo: string;
        makeYear: number;
        expiryDate: string;
    }

    const [cars, setCars] = useState<Car[]>([])
    const [deleteId, setDeleteId] = useState<string | null>(null)

    useEffect(() => {
        const cars = axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/cars`)
        .then((cars) => setCars(cars.data))
        .catch((err) => console.log("Error in getting cars data", err))
    }, [])

    useEffect(() => {
    if (!deleteId) return; // nothing to do

    let cancelled = false;

    const run = async () => {
        try {
            await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/cars/${deleteId}`);
            if (cancelled) return;
            // Optimistically remove from UI
            setCars(prev => prev.filter(c => c._id !== deleteId));
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
                    <h1>Total number of cars: {cars.length}</h1>

                    <div className="mt-5 flex flex-col gap-2">
                        <h1 className="px-5 font-bold text-3xl">Cars</h1>

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

                                        {cars.map((c)=> (
                                            <tr key={c._id} className="border-b-1">

                                                <td className="px-4 border-r-1">
                                                    <div className="py-2">
                                                        <h1 className="uppercase font-bold"><span className="text-blue-500">CAR PLATE NO: </span>{c.carPlateNo}</h1>
                                                        <div className="text-[14px]">

                                                            <p><span className="font-bold text-[12px]">CAR MODEL: </span> {c.carModel}</p>
                                                            <p><span className="font-bold text-[12px]">CAR COLOR: </span>{c.carColor}</p>
                                                            <p><span className="font-bold text-[12px]">CAR BRAND: </span>{c.carBrand}</p>
                                                            <p><span className="font-bold text-[12px]">CAR CHASSIS NO: </span>{c.chassisNo}</p>
                                                            <p><span className="font-bold text-[12px]">CAR MAKE YEAR: </span>{c.makeYear}</p>
                                                            <p><span className="font-bold text-[12px]">CAR EXPIRY DATE: </span>{c.expiryDate}</p>

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