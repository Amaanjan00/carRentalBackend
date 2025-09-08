import { Fine } from '../models/fines.model.js';

export const getAllFines = async (req, res) => {
  try {
    const fines = await Fine.find();
    res.status(200).json(fines);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const getFineById = async (req, res) => {
  try {
    const fine = await Fine.findById(req.params.id);
    if (!fine) {
      return res.status(404).json({ message: 'Fine not found' });
    }
    res.status(200).json(fine);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const createFine = async (req, res) => {
  try {
    const newFine = new Fine(req.body);
    const savedFine = await newFine.save();
    res.status(201).json(savedFine);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const updateFine = async (req, res) => {
  try {
    const updatedFine = await Fine.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedFine) {
      return res.status(404).json({ message: 'Fine not found' });
    }
    res.status(200).json(updatedFine);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const deleteFine = async (req, res) => {
  try {
    const deletedFine = await Fine.findByIdAndDelete(req.params.id);
    if (!deletedFine) {
      return res.status(404).json({ message: 'Fine not found' });
    }
    res.status(200).json({ message: 'Fine deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

