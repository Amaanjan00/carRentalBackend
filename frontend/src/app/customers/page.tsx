'use client'
import axios from "axios";
import { useEffect, useState } from "react"
import { tr } from "zod/locales";

export default function Page(){

    type Customer = {
        _id: string;
        customerName: string;
        customerPhone: string;
        customerEmail: string;
        customerAddress: string;
        customerDrivingLicense: string;
    }

    const [customers, setCustomers] = useState<Customer[]>([])
    const [search, setSearch] = useState<String>('')

    const searching = customers.filter(({customerName}) => customerName == search)

    useEffect(() => {
        const bills = axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/customers`)
        .then((bills) => setCustomers(bills.data))
        .catch((err) => console.log("Error in getting bills data", err))
    }, [])

    return(
        <>
            <div className="flex flex-col gap-10 p-4">
                <div className="bg-red">
                    <div className="p-4 bg-blue-500 w-fit text-2xl font-extrabold text-white flex flex-col">
                        Total number of customers 
                        <span className="text-4xl p-2">{customers.length}</span>
                    </div>
                </div>

                <div className="bg-gray-200 w-fit p-4 flex gap-4 rounded-2xl">
                    <form>
                        <label className="font-bold">Search</label>
                        <input className="bg-white" type="text" onChange={e => setSearch(e.target.value)} />
                        <button type="submit"></button>
                    </form>
                </div>

                <div className="flex flex-col gap-10">

                    {searching.length > 0 ? (
                        <>
                            <table className="w-full bg-gray-200 text-[12px]">
                                <thead>
                                    <tr className="text-left border-b-2">
                                        <th className="border-1 p-2">ID</th>
                                        <th className="border-1 p-2">Customer Name</th>
                                        <th className="border-1 p-2">Customer Phone</th>
                                        <th className="border-1 p-2">Customer Email</th>
                                        <th className="border-1 p-2">Customer Address</th>
                                        <th className="border-1 p-2">Customer Driving License</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {searching.map((c) => (
                                    <tr key={c._id} className="text-left border-1">
                                        <td className="border-1 p-1">{c._id}</td>
                                        <td className="border-1 p-1">{c.customerName}</td>
                                        <td className="border-1 p-1">{c.customerPhone}</td>
                                        <td className="border-1 p-1">{c.customerEmail}</td>
                                        <td className="border-1 p-1">{c.customerAddress}</td>
                                        <td className="border-1 p-1">{c.customerDrivingLicense}</td>
                                    </tr>
                                    ))}
                                </tbody>
                            </table>
                        </>
                    ): (null)}

                    <table className="w-full bg-gray-200 text-[12px]">
                        <thead>
                            <tr className="text-left border-b-2">
                                <th className="border-1 p-2">ID</th>
                                <th className="border-1 p-2">Customer Name</th>
                                <th className="border-1 p-2">Customer Phone</th>
                                <th className="border-1 p-2">Customer Email</th>
                                <th className="border-1 p-2">Customer Address</th>
                                <th className="border-1 p-2">Customer Driving License</th>
                            </tr>
                        </thead>

                        <tbody>
                            {customers.map((c) => (
                                <tr key={c._id} className="text-left border-1">
                                    <td className="border-1 p-1">{c._id}</td>
                                    <td className="border-1 p-1">{c.customerName}</td>
                                    <td className="border-1 p-1">{c.customerPhone}</td>
                                    <td className="border-1 p-1">{c.customerEmail}</td>
                                    <td className="border-1 p-1">{c.customerAddress}</td>
                                    <td className="border-1 p-1">{c.customerDrivingLicense}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}