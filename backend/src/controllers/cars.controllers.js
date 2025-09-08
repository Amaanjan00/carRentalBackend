import { Car } from '../models/cars.model.js';

export const getAllCars = async (req, res) => {
  // Logic to get all cars
  try {
    const cars = await Car.find();
    res.json(cars);
  } catch (error) {
    console.error('Error fetching cars:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getCarById = async (req, res) => {
  // Logic to get a car by ID
  try {
    const car = await Car.findById(req.params.id);
    if (!car) {
      return res.status(404).json({ error: 'Car not found' });
    }
    res.json(car);
  } catch (error) {
    console.error('Error fetching car by ID:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createCar = async (req, res) => {
  // Logic to create a new car
  try {
    const newCar = new Car(req.body);
    await newCar.save();
    res.status(201).json({message: 'Car created successfully', car: newCar});
  } catch (error) {
    console.error('Error creating car:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateCar = async (req, res) => {
  // Logic to update a car
  try {
    const car = await Car.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!car) {
      return res.status(404).json({ error: 'Car not found' });
    }
    res.status(200).json({ message: 'Car updated successfully', car });
  } catch (error) {
    console.error('Error updating car:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteCar = async (req, res) => {
  // Logic to delete a car
  try {
    const car = await Car.findByIdAndDelete(req.params.id);
    if (!car) {
      return res.status(404).json({ error: 'Car not found' });
    }
    res.status(200).json({ message: 'Car deleted successfully', deleteCar: car });
  } catch (error) {
    console.error('Error deleting car:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
