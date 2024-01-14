// import packages
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import 'dotenv/config';
import swagger from 'swagger-ui-express';

import UserRouter from './src/features/users/user.routes.js'
import PatientRoute from './src/features/patient/patient.routes.js'
import { connectToMongoDB } from './src/config/mongodb.js';
import jwtAuth from './src/middlewares/jwt.Middleware.js';
import { startSmsScheduler } from './src/config/smsScheduler.js';
import { errorHandlerMiddleware } from './src/middlewares/errorHandler.js';
import apiDocs from './swagger.json' assert {type: 'json'};


const server = express();
const port = 8000;

// middlewares
server.use(bodyParser.json());
server.use(cors());

// Routes
server.get('/', (req, res)=> {
    res.send('Welcome to HealthGuard API');
});
server.use('/api-docs', swagger.serve , swagger.setup(apiDocs)); 
server.use('/api/users',UserRouter);
server.use('/api/patient', jwtAuth,PatientRoute);

// Default Route
server.use((req, res)=> {
    res.status(404).send("API not found. Please check our documentation for more information at localhost:8000/api-docs");
});

// Error Handle minddleware
server.use(errorHandlerMiddleware);

server.listen(port, ()=> {
    console.log(`Server is running on ${port}`);
    connectToMongoDB();
    startSmsScheduler();
})