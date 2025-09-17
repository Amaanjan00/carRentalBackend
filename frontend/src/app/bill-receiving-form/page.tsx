'use client'
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from 'zod';
import axios from "axios";
import { useEffect, useState } from "react";

export const BillReceivingSchema = z.object({
  vehicleAgreementNo: z.string().min(1, "Vehicle Agreement ID is required"),
  amountreceived: z.number().positive("Amount must be greater than 0"),
  receivedby: z.string().min(1, "Receiver name is required"),
  paymentmode: z.enum(['Cash', 'Card', 'Online']),
});

// Type inference (optional)
export type BillReceivingInput = z.infer<typeof BillReceivingSchema>;

export default function Page() {

  type Contract = {
    _id: string;
    vehicleAgreementNumber: string;
  }

  const [contracts, setContracts] = useState<Contract[]>([])

  useEffect(() => {
    const contracts = axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/contracts`)
    .then((contracts) => setContracts(contracts.data))
    .catch((err) => console.log("Error in getting contracts data", err))
  }, [])

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<BillReceivingInput>({
    resolver: zodResolver(BillReceivingSchema)
  });

  const onSubmit: SubmitHandler<BillReceivingInput> = async (data) => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/billsreceiving`, data);
      console.log("Bill receiving added successfully:", data);
      window.alert("Bill Received")
      reset(); // clear the form after success
    } catch (error) {
      console.error("Error adding bill receiving:", error);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-5">
        <h1 className="font-extrabold text-2xl text-blue-400">ADD BILL RECEIVING</h1>

        <div className="flex justify-center items-center">
          <form
            className="flex flex-col gap-5 w-100 bg-white p-4 shadow-2xl rounded-2xl"
            onSubmit={handleSubmit(onSubmit)}
            method="post"
          >

            <div>
              <label>Vehicle Agreement (ID)</label>
              <select {...register("vehicleAgreementNo")} className="bg-gray-100 p-2 text-[12px] rounded-[6px] w-full" defaultValue="">
                <option value="" disabled>Select an agreement id</option>
                {contracts.map((c) => (
                  <option key={c._id} value={c._id}>{c.vehicleAgreementNumber}</option>
                ))}
              </select>
              {errors.vehicleAgreementNo && <div>{errors.vehicleAgreementNo.message}</div>}
            </div>

            <div>
              <label htmlFor="">Amount Received</label>
              <input
                {...register("amountreceived", { valueAsNumber: true })}
                className="bg-gray-100 p-2 text-[12px] rounded-[6px] w-full"
                placeholder="amountreceived"
                type="number"
                step="0.01"
              />
              {errors.amountreceived && <div>{errors.amountreceived.message}</div>}
            </div>

            <div>
              <label htmlFor="">Received By</label>
              <input
                {...register("receivedby")}
                className="bg-gray-100 p-2 text-[12px] rounded-[6px] w-full"
                placeholder="receivedby"
                type="text"
              />
              {errors.receivedby && <div>{errors.receivedby.message}</div>}
            </div>

            <div>
              <label htmlFor="">Payment Mode</label>
              <select
                {...register("paymentmode")}
                className="bg-gray-100 p-2 text-[12px] rounded-[6px] w-full"
                defaultValue=""
              >
                <option value="" disabled>Select mode</option>
                <option value="Cash">Cash</option>
                <option value="Card">Card</option>
                <option value="Online">Online</option>
              </select>
              {errors.paymentmode && <div>{errors.paymentmode.message}</div>}
            </div>

            <button disabled={isSubmitting} type="submit" className="bg-green-400 text-white rounded-2xl">
              {isSubmitting ? "Wait..." : "Submit"}
            </button>

          </form>
        </div>

      </div>
    </>
  );
}
