import mongoose from "mongoose";

const carSchema = new mongoose.Schema(
    {
        carPlateNo: { type: String, required: true, unique: true },
        carModel: { type: String, required: true, trim: true },
        carColor: { type: String, required: true, trim: true },
        carBrand: { type: String, required: true, trim: true },
        chassisNo: { type: String, required: true, unique: true, trim: true },
        makeYear: { type: Number, required: true, min: 2019, max: new Date().getFullYear()},
        expiryDate: { type: Date, required: true }
    }, 
    { timestamps: true }
);

carSchema.virtual('daysLeft').get(function() {
    const today = new Date();
    const timeDiff = this.expiryDate - today;
    const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    return daysDiff;
});

export const Car = mongoose.model("Car", carSchema);