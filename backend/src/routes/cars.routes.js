import express from 'express';
import {createCar, deleteCar, getAllCars, getCarById, updateCar} from '../controllers/cars.controllers.js';

const carsRouter = express.Router();

// Define your car routes here
carsRouter.get('/', getAllCars);
carsRouter.get('/:id', getCarById);
carsRouter.post('/', createCar);
carsRouter.patch('/:id', updateCar);
carsRouter.delete('/:id', deleteCar);

export default carsRouter;
