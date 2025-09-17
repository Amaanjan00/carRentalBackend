import { Contract } from '../models/contract.model.js'

export const getAllCustomers = async (req, res) => {
    try {
        const customers = await Contract.aggregate([
            {
                $group: {
                _id: "$customerEmiratesID", // unique by Emirates ID
                customerName: { $first: "$customerName" },
                customerPhone: { $first: "$customerPhone" },
                customerEmail: { $first: "$customerEmail" },
                customerAddress: { $first: "$customerAddress" },
                customerDrivingLicense: { $first: "$customerDrivingLicense" },
                },
            },
            {
                $project: {
                    customerName: 1,
                    customerEmiratesID: 1,
                    customerPhone: 1,
                    customerEmail: 1,
                    customerAddress: 1,
                    customerDrivingLicense: 1,
                }
            }
        ])

        res.status(200).json(customers)
    } catch (error) {
        res.status(500).json("Error in getting all customers")
    }
}


export const getAllACustomers = async (req, res) => {
    try {
        const customers = Contract.aggregate([
            // {
            //     $group: {
            //     _id: "$customerEmiratesID", // unique by Emirates ID
            //     customerName: { $first: "$customerName" },
            //     customerPhone: { $first: "$customerPhone" },
            //     customerEmail: { $first: "$customerEmail" },
            //     customerAddress: { $first: "$customerAddress" },
            //     customerDrivingLicense: { $first: "$customerDrivingLicense" },
            //     },
            // },
            {
                $project: {
                    customerName: 1,
                    customerEmiratesID: 1,
                    customerPhone: 1,
                    customerEmail: 1,
                    customerAddress: 1,
                    customerDrivingLicense: 1,
                }
            }
        ])

        res.status(200).json(customers)
    } catch (error) {
        res.status(500).json("Error in getting all customers")
    }
}