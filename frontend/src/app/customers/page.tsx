'use client'
import axios from "axios";
import { useEffect, useState } from "react"

export default function Page(){

    type BillReceived = {
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
    }

    const [billsreceived, setBillsreceived] = useState<BillReceived[]>([])

    useEffect(() => {
        const bills = axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/billsreceiving`)
        .then((bills) => setBillsreceived(bills.data))
        .catch((err) => console.log("Error in getting bills data", err))
    }, [])

    return(
        <>
            <div>
                <div className="bg-red">
                    <h1>Total number of customers: {billsreceived.length}</h1>
                </div>
            </div>
        </>
    )
}