import { Contract } from '../models/contract.model.js';

// Controller to create a new contract
export const createContract = async (req, res) => {
  try {
    const newContract = new Contract(req.body);
    await newContract.save();
    res.status(201).json({ message: 'Contract created successfully', contract: newContract });
  } catch (error) {
    console.error('Error creating contract:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


// Controller to get all contracts
export const getAllContracts = async (req, res) => {
  try {

    const contracts = await Contract.aggregate(
      [
        {
          $lookup: {
            from: "cars",
            localField: "car",
            foreignField: "_id",
            as: "car"
          }
        },
        {
          $addFields: {
            car: {
              $arrayElemAt: ["$car", 0]
            }
          }
        },
        {
          $lookup: {
            from: "billreceivings",
            localField: "_id",
            foreignField: "vehicleAgreementNo",
            pipeline: [
              {
                $project: {
                  __v: 0,
                  _id: 0,
                  vehicleAgreementNo: 0
                }
              }
            ],
            as: "payment"
          }
        },
        {
          $lookup: {
            from: "fines",
            localField: "_id",
            foreignField: "vehicleAgreementNumber",
            pipeline: [
              {
                $project: {
                  __v: 0,
                  _id: 0,
                  vehicleAgreementNumber: 0,
                  car: 0
                }
              }
            ],
            as: "fines",
          },
        },
        {
          $lookup: {
            from: "saliks",
            localField: "_id",
            foreignField: "vehicleAgreementNumber",
            pipeline: [
              {
                $project: {
                  __v: 0,
                  _id: 0,
                  vehicleAgreementNumber: 0,
                  car: 0
                }
              }
            ],
            as: "salik"
          },
        },
        {
          $addFields: {
            amountPerDay: { 
              $switch: {
                branches: [
                  { case: { $eq: ["$rentalType", "Monthly"] }, then: { $divide: ["$rentalAmount", 30] } },
                  { case: { $eq: ["$rentalType", "Weekly"] }, then: { $divide: ["$rentalAmount", 7] } }
                ],
                default: "$rentalAmount"
              } 
            },
            contractDays: {
              $max: [
                0,
                { $dateDiff: { startDate: "$contractStartDate", endDate: "$$NOW", unit: "day" } }
              ]
            },
            totalFineAmount: {
              $sum: {
                $map: { input: "$fines", as: "f", in: { $ifNull: ["$$f.fineAmount", 0] } }
              }
            },
            totalSalikAmount: {
              $sum: {
                $map: { input: "$salik", as: "s", in: { $ifNull: ["$$s.salikAmount", 0] } }
              }
            },
            totalAmountReceived: {
              $sum: {
                $map: { input: "$payment", as: "p", in: { $ifNull: ["$$p.amountreceived", 0] } }
              }
            }
          }
        },
        {
          $addFields: {
            totalRentalAmount: { $multiply: ["$amountPerDay", "$contractDays"] }
          }
        },
        {
          $addFields: {
            totalContractAmount: { $add: ["$totalRentalAmount", "$totalFineAmount", "$totalSalikAmount"] }
          }
        },
        {
          $addFields: {
            totalAmountRemaining: { $subtract: ["$totalContractAmount", "$totalAmountReceived"] }
          }
        }
      ]
    )


    // const contracts = await Contract.find();
    res.status(200).json(contracts);
  } catch (error) {
    console.error('Error fetching contracts:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


// Active Contracts
export const getAllActiveContracts = async (req, res) => {
  try {

    const contracts = await Contract.aggregate(
      [
        {
          $match: {contractStatus: "Active"}
        },
        {
          $lookup: {
            from: "cars",
            localField: "car",
            foreignField: "_id",
            as: "car"
          }
        },
        {
          $addFields: {
            car: {
              $arrayElemAt: ["$car", 0]
            }
          }
        },
        {
          $lookup: {
            from: "billreceivings",
            localField: "_id",
            foreignField: "vehicleAgreementNo",
            pipeline: [
              {
                $project: {
                  __v: 0,
                  _id: 0,
                  vehicleAgreementNo: 0
                }
              }
            ],
            as: "payment"
          }
        },
        {
          $lookup: {
            from: "fines",
            localField: "_id",
            foreignField: "vehicleAgreementNumber",
            pipeline: [
              {
                $project: {
                  __v: 0,
                  _id: 0,
                  vehicleAgreementNumber: 0,
                  car: 0
                }
              }
            ],
            as: "fines",
          },
        },
        {
          $lookup: {
            from: "saliks",
            localField: "_id",
            foreignField: "vehicleAgreementNumber",
            pipeline: [
              {
                $project: {
                  __v: 0,
                  _id: 0,
                  vehicleAgreementNumber: 0,
                  car: 0
                }
              }
            ],
            as: "salik"
          },
        },
        {
          $addFields: {
            amountPerDay: { 
              $switch: {
                branches: [
                  { case: { $eq: ["$rentalType", "Monthly"] }, then: { $divide: ["$rentalAmount", 30] } },
                  { case: { $eq: ["$rentalType", "Weekly"] }, then: { $divide: ["$rentalAmount", 7] } }
                ],
                default: "$rentalAmount"
              } 
            },
            contractDays: {
              $max: [
                0,
                { $dateDiff: { startDate: "$contractStartDate", endDate: "$$NOW", unit: "day" } }
              ]
            },
            totalFineAmount: {
              $sum: {
                $map: { input: "$fines", as: "f", in: { $ifNull: ["$$f.fineAmount", 0] } }
              }
            },
            totalSalikAmount: {
              $sum: {
                $map: { input: "$salik", as: "s", in: { $ifNull: ["$$s.salikAmount", 0] } }
              }
            },
            totalAmountReceived: {
              $sum: {
                $map: { input: "$payment", as: "p", in: { $ifNull: ["$$p.amountreceived", 0] } }
              }
            }
          }
        },
        {
          $addFields: {
            totalRentalAmount: { $multiply: ["$amountPerDay", "$contractDays"] }
          }
        },
        {
          $addFields: {
            totalContractAmount: { $add: ["$totalRentalAmount", "$totalFineAmount", "$totalSalikAmount"] }
          }
        },
        {
          $addFields: {
            totalAmountRemaining: { $subtract: ["$totalContractAmount", "$totalAmountReceived"] }
          }
        }
      ]
    )


    // const contracts = await Contract.find();
    res.status(200).json(contracts);
  } catch (error) {
    console.error('Error fetching contracts:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


// Inactive Contracts
export const getAllInactiveContracts = async (req, res) => {
  try {

    const contracts = await Contract.aggregate(
      [
        {
          $match: {contractStatus: "Completed"}
        },
        {
          $lookup: {
            from: "cars",
            localField: "car",
            foreignField: "_id",
            as: "car"
          }
        },
        {
          $addFields: {
            car: {
              $arrayElemAt: ["$car", 0]
            }
          }
        },
        {
          $lookup: {
            from: "billreceivings",
            localField: "_id",
            foreignField: "vehicleAgreementNo",
            pipeline: [
              {
                $project: {
                  __v: 0,
                  _id: 0,
                  vehicleAgreementNo: 0
                }
              }
            ],
            as: "payment"
          }
        },
        {
          $lookup: {
            from: "fines",
            localField: "_id",
            foreignField: "vehicleAgreementNumber",
            pipeline: [
              {
                $project: {
                  __v: 0,
                  _id: 0,
                  vehicleAgreementNumber: 0,
                  car: 0
                }
              }
            ],
            as: "fines",
          },
        },
        {
          $lookup: {
            from: "saliks",
            localField: "_id",
            foreignField: "vehicleAgreementNumber",
            pipeline: [
              {
                $project: {
                  __v: 0,
                  _id: 0,
                  vehicleAgreementNumber: 0,
                  car: 0
                }
              }
            ],
            as: "salik"
          },
        },
        {
          $addFields: {
            amountPerDay: { 
              $switch: {
                branches: [
                  { case: { $eq: ["$rentalType", "Monthly"] }, then: { $divide: ["$rentalAmount", 30] } },
                  { case: { $eq: ["$rentalType", "Weekly"] }, then: { $divide: ["$rentalAmount", 7] } }
                ],
                default: "$rentalAmount"
              } 
            },
            contractDays: {
              $max: [
                0,
                { $dateDiff: { startDate: "$contractStartDate", endDate: "$$NOW", unit: "day" } }
              ]
            },
            totalFineAmount: {
              $sum: {
                $map: { input: "$fines", as: "f", in: { $ifNull: ["$$f.fineAmount", 0] } }
              }
            },
            totalSalikAmount: {
              $sum: {
                $map: { input: "$salik", as: "s", in: { $ifNull: ["$$s.salikAmount", 0] } }
              }
            },
            totalAmountReceived: {
              $sum: {
                $map: { input: "$payment", as: "p", in: { $ifNull: ["$$p.amountreceived", 0] } }
              }
            }
          }
        },
        {
          $addFields: {
            totalRentalAmount: { $multiply: ["$amountPerDay", "$contractDays"] }
          }
        },
        {
          $addFields: {
            totalContractAmount: { $add: ["$totalRentalAmount", "$totalFineAmount", "$totalSalikAmount"] }
          }
        },
        {
          $addFields: {
            totalAmountRemaining: { $subtract: ["$totalContractAmount", "$totalAmountReceived"] }
          }
        }
      ]
    )


    // const contracts = await Contract.find();
    res.status(200).json(contracts);
  } catch (error) {
    console.error('Error fetching contracts:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


// Controller to get a contract by ID
export const getContractById = async (req, res) => {
  try {
    const contract = await Contract.findById(req.params.id);
    if (!contract) {
      return res.status(404).json({ error: 'Contract not found' });
    }
    res.status(200).json({ message: 'Contract fetched successfully', contract });
  } catch (error) {
    console.error('Error fetching contract by ID:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


// Controller to update a contract
export const updateContract = async (req, res) => {
  try {
    const contract = await Contract.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!contract) {
      return res.status(404).json({ error: 'Contract not found' });
    }
    res.status(200).json({ message: 'Contract updated successfully', contract });
  } catch (error) {
    console.error('Error updating contract:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


// Controller to delete a contract
export const deleteContract = async (req, res) => {
  try {
    const contract = await Contract.findByIdAndDelete(req.params.id);
    if (!contract) {
      return res.status(404).json({ error: 'Contract not found' });
    }
    res.status(200).json({ message: 'Contract deleted successfully', deleteContract: contract });
  } catch (error) {
    console.error('Error deleting contract:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


// Convert Active to Completed
export const cancelContract = async (req, res) => {
  try {
    const { _id } = req.body;
    const findContract = await Contract.findOneAndUpdate(
      { _id },
      { $set: { contractStatus: 'Completed' } },
      { new: true, runValidators: true }
    )
    if (!findContract) {
      return res.status(404).json({ message: "Contract not found"})
    }
    res.status(200).json({ message: 'Contract updated successfully' })
  } catch (error) {
    console.error('Error updating contract:', error);
    res.status(500).json({ error: 'Cound not end contract from server' });
  }
}