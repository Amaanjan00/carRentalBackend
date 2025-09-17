'use client'
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from 'zod';
import axios from "axios";

export const CarSchema = z.object({
  carPlateNo: z.string().min(1, "Car plate number is required"),
  carModel: z.string().min(1, "Car model is required"),
  carColor: z.string().min(1, "Car color is required"),
  carBrand: z.string().min(1, "Car brand is required"),
  chassisNo: z.string().min(1, "Chassis number is required"),
  makeYear: z
    .number()
    .min(2019, { message: "Make year must be at least 2019" })
    .max(new Date().getFullYear(), { message: `Make year cannot be greater than ${new Date().getFullYear()}` }),
  expiryDate: z.preprocess(
    (arg) => (typeof arg === "string" || arg instanceof Date ? new Date(arg) : arg),
    z.date()
  ),
});

// Type inference (optional)
export type CarInput = z.infer<typeof CarSchema>;

export default function Page() {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<CarInput>({
    resolver: zodResolver(CarSchema) as any
  });

  const onSubmit: SubmitHandler<CarInput> = async (data) => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/cars`, data);
      console.log("Car added successfully:", data);
      window.alert("Car Added Successfully")
      reset(); // clear the form after success
    } catch (error) {
      console.error("Error adding car:", error);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-5">
        <h1 className="font-extrabold text-2xl text-blue-400">ADD NEW CAR</h1>

        <div className="flex justify-center items-center">
          <form
            className="flex flex-col gap-5 w-100 bg-white p-4 shadow-2xl rounded-2xl"
            onSubmit={handleSubmit(onSubmit)}
            method="post"
          >

            <div>
              <label htmlFor="">Car Plate Number</label>
              <input
                {...register("carPlateNo")}
                className="bg-gray-100 p-2 text-[12px] rounded-[6px] w-full"
                placeholder="carPlateNo"
                type="text"
              />
              {errors.carPlateNo && <div>{errors.carPlateNo.message}</div>}
            </div>

            <div>
              <label htmlFor="">Car Model</label>
              <input
                {...register("carModel")}
                className="bg-gray-100 p-2 text-[12px] rounded-[6px] w-full"
                placeholder="carModel"
                type="text"
              />
              {errors.carModel && <div>{errors.carModel.message}</div>}
            </div>

            <div>
              <label htmlFor="">Car Color</label>
              <input
                {...register("carColor")}
                className="bg-gray-100 p-2 text-[12px] rounded-[6px] w-full"
                placeholder="carColor"
                type="text"
              />
              {errors.carColor && <div>{errors.carColor.message}</div>}
            </div>

            <div>
              <label htmlFor="">Car Brand</label>
              <input
                {...register("carBrand")}
                className="bg-gray-100 p-2 text-[12px] rounded-[6px] w-full"
                placeholder="carBrand"
                type="text"
              />
              {errors.carBrand && <div>{errors.carBrand.message}</div>}
            </div>

            <div>
              <label htmlFor="">Chassis Number</label>
              <input
                {...register("chassisNo")}
                className="bg-gray-100 p-2 text-[12px] rounded-[6px] w-full"
                placeholder="chassisNo"
                type="text"
              />
              {errors.chassisNo && <div>{errors.chassisNo.message}</div>}
            </div>

            <div>
              <label htmlFor="">Make Year</label>
              <input
                {...register("makeYear", { valueAsNumber: true })}
                className="bg-gray-100 p-2 text-[12px] rounded-[6px] w-full"
                placeholder="makeYear"
                type="number"
              />
              {errors.makeYear && <div>{errors.makeYear.message}</div>}
            </div>

            <div>
              <label htmlFor="">Expiry Date</label>
              <input
                {...register("expiryDate", { valueAsDate: true })}
                className="bg-gray-100 p-2 text-[12px] rounded-[6px] w-full"
                placeholder="expiryDate"
                type="date"
              />
              {errors.expiryDate && <div>{errors.expiryDate.message}</div>}
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
