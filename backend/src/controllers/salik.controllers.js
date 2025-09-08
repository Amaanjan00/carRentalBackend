import { Salik } from "../models/salik.model.js";

export const getAllSalik = async (req, res) => {
  try {
    const salik = await Salik.find();
    res.status(200).json(salik);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const getSalikById = async (req, res) => {
  try {
    const salik = await Salik.findById(req.params.id);
    if (!salik) {
      return res.status(404).json({ message: "Salik not found" });
    }
    res.status(200).json(salik);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const createSalik = async (req, res) => {
  try {
    const newSalik = new Salik(req.body);
    const savedSalik = await newSalik.save();
    res.status(201).json(savedSalik);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const updateSalik = async (req, res) => {
  try {
    const updatedSalik = await Salik.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedSalik) {
      return res.status(404).json({ message: "Salik not found" });
    }
    res.status(200).json(updatedSalik);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const deleteSalik = async (req, res) => {
  try {
    const deletedSalik = await Salik.findByIdAndDelete(req.params.id);
    if (!deletedSalik) {
      return res.status(404).json({ message: "Salik not found" });
    }
    res.status(200).json({ message: "Salik deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
