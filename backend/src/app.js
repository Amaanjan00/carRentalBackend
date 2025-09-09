import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import carsRouter from './routes/cars.routes.js';
import contractsRouter from './routes/contracts.routes.js';
import finesRouter from './routes/fines.routes.js';
import salikRouter from './routes/salik.routes.js';
import billsReceivingRouter from './routes/billsreceiving.routes.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cors(
    { 
        origin: 'http://localhost:3000', 
    }
));
app.use(cookieParser());

// Define your routes here
app.use('/api/cars', carsRouter);
app.use('/api/contracts', contractsRouter);
app.use('/api/fines', finesRouter);
app.use('/api/salik', salikRouter);
app.use('/api/billsreceiving', billsReceivingRouter);

export { app };