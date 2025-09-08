import mongoose from "mongoose";

const salikSchema = new mongoose.Schema(
    {
        vehicleAgreementNumber: { type: mongoose.Schema.Types.ObjectId, ref: 'Contract', required: true },
        car: { type: mongoose.Schema.Types.ObjectId, ref: 'Car', required: true },
        salikAmount: { type: Number, required: true, min: 0 },
        salikDate: { type: Date, required: true },
        numberOfTrips: { type: Number, required: true}
    }, 
    { timestamps: true }
);

export const Salik = mongoose.model("Salik", salikSchema);