import nodemailer from 'nodemailer';
import {ReminderModel, AppoinmentModel} from "./patient.model.js";
import PatientRepository from "./patient.repository.js";

export class PatientController {
    constructor() {
        this.patientRepository = new PatientRepository();
    }

    async addReminder(req, res, next) {
        try {
            const { name,number,time,medicineName } = req.body;
            const remind = new ReminderModel(name,number,time,medicineName);
            await this.patientRepository.reminder(remind)
            res.status(201).send(remind);
        } catch (err) {
            next(err);
        }
    }

    async addAppoinment(req, res, next) {
        try {
            const { name, date, time, email } = req.body;
            const appoinment = new AppoinmentModel(name, date, time, email );
            await this.patientRepository.appoinment(appoinment)
            sendConfirmationEmail(appoinment);
            res.status(201).send("Your appointment has been booked successfully.");
        } catch (err) {
            next(err);
        }
    }
}


function sendConfirmationEmail(appointment) {

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL, 
            pass: process.env.PASSWORD,
        },
    });

    const mailOptions = {
        from:  process.env.EMAIL,
        to: appointment.email,
        subject: 'Appointment Confirmation',
        html: `
        <p style="color:black;">Dear <b>${appointment.name}</b>,</p>

        <p style="color:black;">We are pleased to inform you that your appointment has been successfully booked. Please find the details below:</p>
        
        <p style="color:black;"><b>Date:</b> ${appointment.date}</p>
        <p style="color:black;"><b>Time:</b> ${appointment.time}</p>
        <p style="color:black;"><b>Google Meet Link:</b> https://meet.google.com/kdu-wtej-byh </p>

        <p style="color:black;">Thank you for choosing our service. If you have any further inquiries or need assistance, feel free to reach out.</p>
        
        <p style="color:black;"><b>Best regards</b>,</p>
        
        <p style="color:grey;">Yashwant Kumar Sonkar<br>Hospital Operations Manager<br>AIIMS Raipur CG</p>
    `,
    };

    transporter.sendMail(mailOptions, (err) => {
        if (err) {
        console.error('Error sending confirmation email:', err);
        } else {
        console.log(`Confirmation email sent to ${appointment.email}`);
        }
    });
}