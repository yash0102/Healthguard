import express from 'express';
import { PatientController } from './patient.controller.js';

const router = express.Router();
const patientController = new PatientController();

router.post('/reminder', (req, res,next) => patientController.addReminder(req, res,next));
router.post('/appoinment', (req, res,next) => patientController.addAppoinment(req, res,next));

export default router;
