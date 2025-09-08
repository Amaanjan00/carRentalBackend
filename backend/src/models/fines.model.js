import mongoose from "mongoose";

const fineSchema = new mongoose.Schema(
    {
        vehicleAgreementNumber: { type: mongoose.Schema.Types.ObjectId, ref: 'Contract', required: true },
        car: { type: mongoose.Schema.Types.ObjectId, ref: 'Car', required: true },
        fineAmount: { type: Number, required: true, min: 0 },
        fineDate: { type: Date, required: true },
        fineDetails: { type: String, required: true, trim: true },
        fineStatus: { type: String, required: true, enum: ['Paid', 'Unpaid'], default: 'Unpaid' }
    }, 
    { timestamps: true }
);

export const Fine = mongoose.model("Fine", fineSchema);
