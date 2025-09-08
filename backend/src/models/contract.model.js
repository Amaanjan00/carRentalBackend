import mongoose from "mongoose";

const contractSchema = new mongoose.Schema(
    {
        vehicleAgreementNumber: { type: String, required: true, unique: true },
        customerName: { type: String, required: true, trim: true },
        customerEmiratesID: { type: String, required: true, trim: true },
        customerPhone: { type: String, required: true, trim: true },
        customerEmail: { type: String, required: true, trim: true },
        customerAddress: { type: String, required: true, trim: true },
        customerDrivingLicense: { type: String, required: true, trim: true },
        car: { type: mongoose.Schema.Types.ObjectId, ref: 'Car', required: true },
        fines: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Fine' }],
        salik: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Salik' }],
        billspaid: [{ type: mongoose.Schema.Types.ObjectId, ref: 'BillReceiving' }],
        contractStartDate: { type: Date, required: true },
        rentalType: { type: String, required: true, enum: ['Daily', 'Weekly', 'Monthly', 'Yearly'] },
        rentalAmount: { type: Number, required: true, min: 0 },
        depositAmount: { type: Number, required: true, min: 0 },
        contractStatus: { type: String, required: true, enum: ['Active', 'Completed', 'Cancelled'], default: 'Active' }
    }, 
    { timestamps: true }
);

export const Contract = mongoose.model("Contract", contractSchema);
