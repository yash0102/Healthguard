import { getDB } from "../../config/mongodb.js";
import { customErrorHandler } from "../../middlewares/errorHandler.js";


class UserRepository {
    
    async signUp(newUser) {
        try {
            // Get the database
            const db = getDB();
            // Get the collection
            const collection = db.collection("users");
            // Insert the document
            const user = await collection.insertOne(newUser);
            return user;
        } catch (err) {
            throw new customErrorHandler("Something went wrong with database", 500);
        }
    }

    async signIn(email, password) {
        try {
            // Get the database
            const db = getDB();
            // Get the collection
            const collection = db.collection("users");
            // Find the document
            const user = await collection.findOne({email, password});
            return user;
        } catch (err) {
            throw new customErrorHandler("Something went wrong with database", 500);
        }
    }
}

export default UserRepository;