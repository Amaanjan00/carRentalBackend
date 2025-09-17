'use client'
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from 'zod';
import axios from "axios";
import { useEffect, useState } from "react";

// ---- Zod Schema ----
const paymentModes = ["Cash", "Card", "Online"] as const;

const expenseCategories = [
  'Travelling Expenses (E-01)',
  'Petrol Expenses (E-02)',
  'Garage Expenses (E-03)',
  'Marketing Expenses (E-04)',
  'Office Expenses (E-05)',
  'DEWA Expenses (E-06)',
  'Fine Payments (E-07)',
  'Car Passing Expenses (E-08)',
  'Telephone Expenses (E-09)',
  'Loan Installment (E-10)',
  'Deposit Return (E-11)',
  'Car Washing Expenses (E-12)',
  'RTA Expenses (E-13)',
  'Car Tracker Expenses (E-14)',
  'Salary Expenses (E-15)',
  'Bank Charges (E-16)',
  'Driving License Expenses (E-17)',
  'Salik Expenses (E-18)',
  'Insurance Expenses (E-19)',
  'Rent (E-20)',
  'Other Expenses (E-99)',
] as const;

export const ExpenseSchema = z.object({
  // Car is optional in your Mongoose schema, so accept empty selection
  car: z
    .string()
    .optional()
    .transform(v => (v === "" ? undefined : v)),
  expenseAmount: z.number().nonnegative("Expense amount must be >= 0"),
  expenseDetails: z.string().min(1, "Expense details are required"),
  nameOfReceivingParty: z.string().min(1, "Name of receiving party is required"),
  dateOfExpense: z.preprocess(
    (arg) => (typeof arg === "string" ? new Date(arg) : arg),
    z.date()
  ),
  modeOfPayment: z.enum(paymentModes).default("Cash"),
  categoryOfExpense: z.enum(expenseCategories).default("Other Expenses (E-99)"),
});

// Type inference
export type ExpenseInput = z.infer<typeof ExpenseSchema>;

export default function Page() {

  type Car = {
    _id: string;
    carBrand: string;
    carModel: string;
    makeYear: number;
    carPlateNo: string;
  };

  const [cars, setCars] = useState<Car[]>([]);

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/cars`)
      .then((res) => setCars(res.data))
      .catch((err) => console.log("Error in getting cars data", err));
  }, []);

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<ExpenseInput>({
    resolver: zodResolver(ExpenseSchema) as any,
    defaultValues: {
      modeOfPayment: "Cash",
      categoryOfExpense: "Other Expenses (E-99)",
    }
  });

  const onSubmit: SubmitHandler<ExpenseInput> = async (data) => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/expenses`, data);
      console.log("Expense added successfully:", data);
      window.alert("Expense added successfully");
      reset();
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-5">
        <h1 className="font-extrabold text-2xl text-blue-400">ADD EXPENSE</h1>

        <div className="flex justify-center items-center">
          <form
            className="flex flex-col gap-5 w-100 bg-white p-4 shadow-2xl rounded-2xl"
            onSubmit={handleSubmit(onSubmit)}
            method="post"
          >
            {/* Car (optional) */}
            <div>
              <label>Car (Optional)</label>
              <select
                {...register("car")}
                className="bg-gray-100 p-2 text-[12px] rounded-[6px] w-full"
                defaultValue=""
              >
                <option value="">Select a car (optional)</option>
                {cars.map((car) => (
                  <option key={car._id} value={car._id}>
                    {car.carPlateNo}-{car.carBrand}-{car.carModel}-{car.makeYear}
                  </option>
                ))}
              </select>
              {errors.car && <div>{errors.car.message as string}</div>}
            </div>

            <div>
              <label>Expense Amount</label>
              <input
                {...register("expenseAmount", { valueAsNumber: true })}
                className="bg-gray-100 p-2 text-[12px] rounded-[6px] w-full"
                placeholder="expenseAmount"
                type="number"
                step="0.01"
              />
              {errors.expenseAmount && <div>{errors.expenseAmount.message}</div>}
            </div>

            <div>
              <label>Expense Details</label>
              <input
                {...register("expenseDetails")}
                className="bg-gray-100 p-2 text-[12px] rounded-[6px] w-full"
                placeholder="expenseDetails"
                type="text"
              />
              {errors.expenseDetails && <div>{errors.expenseDetails.message}</div>}
            </div>

            <div>
              <label>Name of Receiving Party</label>
              <input
                {...register("nameOfReceivingParty")}
                className="bg-gray-100 p-2 text-[12px] rounded-[6px] w-full"
                placeholder="nameOfReceivingParty"
                type="text"
              />
              {errors.nameOfReceivingParty && <div>{errors.nameOfReceivingParty.message}</div>}
            </div>

            <div>
              <label>Date of Expense</label>
              <input
                {...register("dateOfExpense", { valueAsDate: true })}
                className="bg-gray-100 p-2 text-[12px] rounded-[6px] w-full"
                placeholder="dateOfExpense"
                type="date"
              />
              {errors.dateOfExpense && <div>{`${errors.dateOfExpense.message}`}</div>}
            </div>

            <div>
              <label>Mode of Payment</label>
              <select
                {...register("modeOfPayment")}
                className="bg-gray-100 p-2 text-[12px] rounded-[6px] w-full"
                defaultValue="Cash"
              >
                {paymentModes.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
              {errors.modeOfPayment && <div>{errors.modeOfPayment.message}</div>}
            </div>

            <div>
              <label>Category of Expense</label>
              <select
                {...register("categoryOfExpense")}
                className="bg-gray-100 p-2 text-[12px] rounded-[6px] w-full"
                defaultValue="Other Expenses (E-99)"
              >
                {expenseCategories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              {errors.categoryOfExpense && <div>{errors.categoryOfExpense.message}</div>}
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
