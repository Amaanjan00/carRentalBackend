'use client'
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from 'zod';
import axios from "axios";

// ---- Zod Schema ----
export const FineSchema = z.object({
  vehicleAgreementNumber: z.string().min(1, "Vehicle Agreement ID is required"),
  car: z.string().min(1, "Car ID is required"),
  fineAmount: z.number().nonnegative("Fine amount must be >= 0"),
  fineDate: z.preprocess(
    (arg) => (typeof arg === "string" ? new Date(arg) : arg),
    z.date()
  ),
  fineDetails: z.string().min(1, "Fine details are required"),
  fineStatus: z.enum(["Paid", "Unpaid"]).default("Unpaid"),
});

// Type inference
export type FineInput = z.infer<typeof FineSchema>;

export default function Page() {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FineInput>({
    resolver: zodResolver(FineSchema) as any
  });

  const onSubmit: SubmitHandler<FineInput> = async (data) => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/fines`, data);
      console.log("Fine added successfully:", data);
      reset(); // clear form after success
    } catch (error) {
      console.error("Error adding fine:", error);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-5">
        <h1 className="font-extrabold text-2xl text-blue-400">ADD FINE</h1>

        <div className="flex justify-center items-center">
          <form
            className="flex flex-col gap-5 w-100 bg-white p-4 shadow-2xl rounded-2xl"
            onSubmit={handleSubmit(onSubmit)}
            method="post"
          >

            <div>
              <label>Vehicle Agreement (ID)</label>
              <input
                {...register("vehicleAgreementNumber")}
                className="bg-gray-100 p-2 text-[12px] rounded-[6px] w-full"
                placeholder="vehicleAgreementNumber (ObjectId)"
                type="text"
              />
              {errors.vehicleAgreementNumber && <div>{errors.vehicleAgreementNumber.message}</div>}
            </div>

            <div>
              <label>Car (ID)</label>
              <input
                {...register("car")}
                className="bg-gray-100 p-2 text-[12px] rounded-[6px] w-full"
                placeholder="car (ObjectId)"
                type="text"
              />
              {errors.car && <div>{errors.car.message}</div>}
            </div>

            <div>
              <label>Fine Amount</label>
              <input
                {...register("fineAmount", { valueAsNumber: true })}
                className="bg-gray-100 p-2 text-[12px] rounded-[6px] w-full"
                placeholder="fineAmount"
                type="number"
                step="0.01"
              />
              {errors.fineAmount && <div>{errors.fineAmount.message}</div>}
            </div>

            <div>
              <label>Fine Date</label>
              <input
                {...register("fineDate", { valueAsDate: true })}
                className="bg-gray-100 p-2 text-[12px] rounded-[6px] w-full"
                placeholder="fineDate"
                type="date"
              />
              {errors.fineDate && <div>{errors.fineDate.message}</div>}
            </div>

            <div>
              <label>Fine Details</label>
              <input
                {...register("fineDetails")}
                className="bg-gray-100 p-2 text-[12px] rounded-[6px] w-full"
                placeholder="fineDetails"
                type="text"
              />
              {errors.fineDetails && <div>{errors.fineDetails.message}</div>}
            </div>

            <div>
              <label>Fine Status</label>
              <select
                {...register("fineStatus")}
                className="bg-gray-100 p-2 text-[12px] rounded-[6px] w-full"
                defaultValue="Unpaid"
              >
                <option value="Paid">Paid</option>
                <option value="Unpaid">Unpaid</option>
              </select>
              {errors.fineStatus && <div>{errors.fineStatus.message}</div>}
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
