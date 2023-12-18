import { getDB } from "../../config/mongodb.js";
import { customErrorHandler } from "../../middlewares/errorHandler.js";


class PatientRepository {
    
    async reminder(reminderDetails) {

        try {
            // Get the database
            const db = getDB();
            // Get the collection
            const collection = db.collection("reminders");
            // Insert the document
            const user = await collection.insertOne(reminderDetails);
            return user;
        } catch (err) {
            console.log(err);
            throw new customErrorHandler("Something went wrong with database", 500);
        }
    }

    async appoinment(appoinmentDetails) {
        try {
            // Get the database
            const db = getDB();
            // Get the collection
            const collection = db.collection("appoinments");
            // Insert the document
            const user = await collection.insertOne(appoinmentDetails);
            return user;
        } catch (err) {
            console.log(err);
            throw new customErrorHandler("Something went wrong with database", 500);
        }
    }
}

export default PatientRepository;