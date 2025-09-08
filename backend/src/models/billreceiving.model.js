import mongoose from 'mongoose';

const billReceivingSchema = new mongoose.Schema(
    {
        vehicleAgreementNo: {type: mongoose.Schema.Types.ObjectId, ref: 'VehicleAgreement', required: true},
        amountreceived: {type: Number, required: true},
        receivedby: {type: String, required: true},
        paymentmode: {type: String, enum: ['Cash', 'Card', 'Online'], required: true},
    }, 
    {timestamps: true}
);


export const BillReceiving = mongoose.model('BillReceiving', billReceivingSchema);