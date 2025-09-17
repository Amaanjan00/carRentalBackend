'use client'
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from 'zod';
import axios from "axios";
import { useEffect, useState } from "react";

// ---- Zod Schema ----
export const SalikSchema = z.object({
  vehicleAgreementNumber: z.string().min(1, "Vehicle Agreement ID is required"),
  car: z.string().min(1, "Car ID is required"),
  salikAmount: z.number().nonnegative("Salik amount must be >= 0"),
  salikDate: z.preprocess(
    (arg) => (typeof arg === "string" ? new Date(arg) : arg),
    z.date()
  ),
  numberOfTrips: z.number().int().positive("Trips must be at least 1"),
});

// Type inference
export type SalikInput = z.infer<typeof SalikSchema>;

export default function Page() {

  type Car = {
    _id: string;
    carBrand: string;
    carModel: string;
    makeYear: number;
    carPlateNo: string;
    // add other fields if needed
  };

  type Contract = {
    _id: string;
    vehicleAgreementNumber: string;
  }

  const [cars, setCars] = useState<Car[]>([])
  const [contracts, setContracts] = useState<Contract[]>([])

  useEffect(() => {
    const cars = axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/cars`)
    .then((cars) => setCars(cars.data))
    .catch((err) => console.log("Error in getting cars data", err))
  }, [])

  useEffect(() => {
    const contracts = axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/contracts`)
    .then((contracts) => setContracts(contracts.data))
    .catch((err) => console.log("Error in getting contracts data", err))
  }, [])

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<SalikInput>({
    resolver: zodResolver(SalikSchema) as any
  });

  const onSubmit: SubmitHandler<SalikInput> = async (data) => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/salik`, data);
      console.log("Salik added successfully:", data);
      reset(); // clear form after success
    } catch (error) {
      console.error("Error adding salik:", error);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-5">
        <h1 className="font-extrabold text-2xl text-blue-400">ADD SALIK</h1>

        <div className="flex justify-center items-center">
          <form
            className="flex flex-col gap-5 w-100 bg-white p-4 shadow-2xl rounded-2xl"
            onSubmit={handleSubmit(onSubmit)}
            method="post"
          >
            <div>
              <label>Vehicle Agreement (ID)</label>
              <select {...register("vehicleAgreementNumber")} className="bg-gray-100 p-2 text-[12px] rounded-[6px] w-full" defaultValue="">
                <option value="" disabled>Select an agreement id</option>
                {contracts.map((c) => (
                  <option key={c._id} value={c._id}>{c.vehicleAgreementNumber}</option>
                ))}
              </select>
              {errors.vehicleAgreementNumber && <div>{errors.vehicleAgreementNumber.message}</div>}
            </div>

            <div>
              <label>Car (ID)</label>
              <select {...register("car")} className="bg-gray-100 p-2 text-[12px] rounded-[6px] w-full" defaultValue="">
                <option value="" disabled>Select a car</option>
                {cars.map((car) => (
                  <option key={car._id} value={car._id}>{car.carPlateNo}-{car.carBrand}-{car.carModel}-{car.makeYear}</option>
                ))}
              </select>
              {errors.car && <div>{errors.car.message}</div>}
            </div>

            <div>
              <label>Salik Amount</label>
              <input
                {...register("salikAmount", { valueAsNumber: true })}
                className="bg-gray-100 p-2 text-[12px] rounded-[6px] w-full"
                placeholder="salikAmount"
                type="number"
                step="0.01"
              />
              {errors.salikAmount && <div>{errors.salikAmount.message}</div>}
            </div>

            <div>
              <label>Salik Date</label>
              <input
                {...register("salikDate", { valueAsDate: true })}
                className="bg-gray-100 p-2 text-[12px] rounded-[6px] w-full"
                placeholder="salikDate"
                type="date"
              />
              {errors.salikDate && <div>{errors.salikDate.message}</div>}
            </div>

            <div>
              <label>Number of Trips</label>
              <input
                {...register("numberOfTrips", { valueAsNumber: true })}
                className="bg-gray-100 p-2 text-[12px] rounded-[6px] w-full"
                placeholder="numberOfTrips"
                type="number"
              />
              {errors.numberOfTrips && <div>{errors.numberOfTrips.message}</div>}
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
