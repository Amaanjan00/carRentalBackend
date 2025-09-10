'use client'
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from 'zod';
import axios from "axios";

// ---- Zod Schema ----
export const ContractSchema = z.object({
  vehicleAgreementNumber: z.string().min(1, "Agreement number is required"),
  customerName: z.string().min(1, "Customer name is required"),
  customerEmiratesID: z.string().min(1, "Emirates ID is required"),
  customerPhone: z.string().min(1, "Phone number is required"),
  customerEmail: z.string().email("Invalid email"),
  customerAddress: z.string().min(1, "Address is required"),
  customerDrivingLicense: z.string().min(1, "Driving license is required"),
  car: z.string().min(1, "Car ID is required"),
  contractStartDate: z.preprocess(
    (arg) => (typeof arg === "string" ? new Date(arg) : arg),
    z.date()
  ),
  rentalType: z.enum(['Daily', 'Weekly', 'Monthly', 'Yearly']),
  rentalAmount: z.number().nonnegative("Rental amount must be >= 0"),
  depositAmount: z.number().nonnegative("Deposit amount must be >= 0"),
  contractStatus: z.enum(['Active', 'Completed', 'Cancelled']).default('Active'),
});

// Type inference
export type ContractInput = z.infer<typeof ContractSchema>;

export default function Page() {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<ContractInput>({
    resolver: zodResolver(ContractSchema) as any
  });

  const onSubmit: SubmitHandler<ContractInput> = async (data) => {
        try {
            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/contracts`, data);
            console.log("Contract created successfully:", data);
            reset(); // clear form
        } catch (error) {
            console.error("Error creating contract:", error);
        }
    }

  return (
    <>
      <div className="flex flex-col gap-5">
        <h1 className="font-extrabold text-2xl text-blue-400">ADD CONTRACT</h1>

        <div className="flex justify-center items-center">
          <form
            className="flex flex-col gap-5 w-100 bg-white p-4 shadow-2xl rounded-2xl"
            onSubmit={handleSubmit(onSubmit)}
            method="post"
          >
            <div>
              <label>Agreement Number</label>
              <input {...register("vehicleAgreementNumber")} className="bg-gray-100 p-2 text-[12px] rounded-[6px] w-full" placeholder="Agreement Number" type="text" />
              {errors.vehicleAgreementNumber && <div>{errors.vehicleAgreementNumber.message}</div>}
            </div>

            <div>
              <label>Customer Name</label>
              <input {...register("customerName")} className="bg-gray-100 p-2 text-[12px] rounded-[6px] w-full" placeholder="Customer Name" type="text" />
              {errors.customerName && <div>{errors.customerName.message}</div>}
            </div>

            <div>
              <label>Customer Emirates ID</label>
              <input {...register("customerEmiratesID")} className="bg-gray-100 p-2 text-[12px] rounded-[6px] w-full" placeholder="Emirates ID" type="text" />
              {errors.customerEmiratesID && <div>{errors.customerEmiratesID.message}</div>}
            </div>

            <div>
              <label>Customer Phone</label>
              <input {...register("customerPhone")} className="bg-gray-100 p-2 text-[12px] rounded-[6px] w-full" placeholder="Phone" type="text" />
              {errors.customerPhone && <div>{errors.customerPhone.message}</div>}
            </div>

            <div>
              <label>Customer Email</label>
              <input {...register("customerEmail")} className="bg-gray-100 p-2 text-[12px] rounded-[6px] w-full" placeholder="Email" type="email" />
              {errors.customerEmail && <div>{errors.customerEmail.message}</div>}
            </div>

            <div>
              <label>Customer Address</label>
              <input {...register("customerAddress")} className="bg-gray-100 p-2 text-[12px] rounded-[6px] w-full" placeholder="Address" type="text" />
              {errors.customerAddress && <div>{errors.customerAddress.message}</div>}
            </div>

            <div>
              <label>Driving License</label>
              <input {...register("customerDrivingLicense")} className="bg-gray-100 p-2 text-[12px] rounded-[6px] w-full" placeholder="Driving License" type="text" />
              {errors.customerDrivingLicense && <div>{errors.customerDrivingLicense.message}</div>}
            </div>

            <div>
              <label>Car (ID)</label>
              <input {...register("car")} className="bg-gray-100 p-2 text-[12px] rounded-[6px] w-full" placeholder="Car ObjectId" type="text" />
              {errors.car && <div>{errors.car.message}</div>}
            </div>

            <div>
              <label>Contract Start Date</label>
              <input {...register("contractStartDate", { valueAsDate: true })} className="bg-gray-100 p-2 text-[12px] rounded-[6px] w-full" placeholder="Start Date" type="date" />
              {errors.contractStartDate && <div>{errors.contractStartDate.message}</div>}
            </div>

            <div>
              <label>Rental Type</label>
              <select {...register("rentalType")} className="bg-gray-100 p-2 text-[12px] rounded-[6px] w-full" defaultValue="">
                <option value="" disabled>Select type</option>
                <option value="Daily">Daily</option>
                <option value="Weekly">Weekly</option>
                <option value="Monthly">Monthly</option>
              </select>
              {errors.rentalType && <div>{errors.rentalType.message}</div>}
            </div>

            <div>
              <label>Rental Amount</label>
              <input {...register("rentalAmount", { valueAsNumber: true })} className="bg-gray-100 p-2 text-[12px] rounded-[6px] w-full" placeholder="Rental Amount" type="number" step="0.01" />
              {errors.rentalAmount && <div>{errors.rentalAmount.message}</div>}
            </div>

            <div>
              <label>Deposit Amount</label>
              <input {...register("depositAmount", { valueAsNumber: true })} className="bg-gray-100 p-2 text-[12px] rounded-[6px] w-full" placeholder="Deposit Amount" type="number" step="0.01" />
              {errors.depositAmount && <div>{errors.depositAmount.message}</div>}
            </div>

            <div>
              <label>Contract Status</label>
              <select {...register("contractStatus")} className="bg-gray-100 p-2 text-[12px] rounded-[6px] w-full" defaultValue="Active">
                <option value="Active">Active</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
              {errors.contractStatus && <div>{errors.contractStatus.message}</div>}
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
