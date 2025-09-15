import { BillReceiving } from '../models/billreceiving.model.js';

export const getAllBillsReceiving = async (req, res) => {
    try {
        const bills = await BillReceiving.find();
        res.json(bills);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getAllBills = async (req, res) => {
    try {
        const bills = await BillReceiving.aggregate(
            [
                {
                    $lookup: {
                        from: "contracts",
                        localField: "vehicleAgreementNo",
                        foreignField: "_id",
                        as: "contract",
                        pipeline: [
                        {
                            $project: {
                            vehicleAgreementNumber: 1,
                            _id: 0
                            }
                        }
                        ]
                    }
                },
                {
                    $addFields: {
                    vehicleAgreementId: {
                        $arrayElemAt: ["$contract", 0]
                    }
                    }
                },
                {
                    $project: {
                    __v: 0,
                    vehicleAgreementNo: 0
                    }
                }
            ]
        )

        res.status(200).json(bills)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getBillReceivingById = async (req, res) => {
    try {
        const bill = await BillReceiving.findById(req.params.id);
        if (!bill) return res.status(404).json({ message: 'Bill not found' });
        res.json(bill);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createBillReceiving = async (req, res) => {
    try {
        const newBill = new BillReceiving(req.body);
        const savedBill = await newBill.save();
        res.status(201).json(savedBill);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateBillReceiving = async (req, res) => {
    try {
        const updatedBill = await BillReceiving.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedBill) return res.status(404).json({ message: 'Bill not found' });
        res.json(updatedBill);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteBillReceiving = async (req, res) => {
    try {
        const deletedBill = await BillReceiving.findByIdAndDelete(req.params.id);
        if (!deletedBill) return res.status(404).json({ message: 'Bill not found' });
        res.json({ message: 'Bill deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

