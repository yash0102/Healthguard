import cron from 'node-cron';
import twilio from 'twilio';
import { getDB } from './mongodb.js';


// Twilio configuration
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_NUMBER;

const twilioClient = twilio(accountSid, authToken);

export const startSmsScheduler = () => {
  // Schedule sending SMS every minute
  cron.schedule('* * * * *', async () => {
    // Get the current time in the format HH:mm
    const currentTime = new Date().toLocaleTimeString('en-US', { hour12: false,  hour: '2-digit', minute: '2-digit'});
    console.log(currentTime);


    const db = getDB();
    const collection = db.collection("reminders");
    // Fetch users with scheduled medicines whose time matches the current time
    const usersWithScheduledMedicines = await collection.find({ time: currentTime }).toArray();;

    // Send reminders to each user
    try {
        usersWithScheduledMedicines.forEach((user) => {
            const message = `Dear ${user.name}, it's time to take your medicines: ${user.medicineName.join(', ')}.`;
            console.log("message :", message);
            sendSms(user.number, message);
            console.log("Reminder sent to", user.name);
        });
    } catch (error) {
        console.log("Error in forEach loop :", error);
    }
    });
};

const sendSms = (to, message) => {
    console.log("sendSms function");   
    twilioClient.messages
    .create({
        body: message,
        from: twilioPhoneNumber,
        to,
    })
    .then((message) => console.log(`SMS sent: ${message.sid}`))
    .catch((error) => console.error(`Error sending SMS: ${error.message}`));
};

