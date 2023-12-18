import UserModel from "./user.model.js";
import jwt from 'jsonwebtoken';
import UserRepository from "./user.repository.js";

export class UserController {
    constructor() {
        this.userRepository = new UserRepository();
    }

    async signUp (req, res) {
        try {
            const { name, email, password, type } = req.body;
            const user = new UserModel(name, email, password, type);
            await this.userRepository.signUp(user);
            res.status(201).send(user);
        } catch (err) {
            console.log(err);
            return res.status(400).send("Something went wrong");
        }
    }

    async signIn (req, res) {
        try {
            const result = await this.userRepository.signIn(req.body.email , req.body.password);
            if (!result){
                return res.status(400).send("Incorrect Credentials");
            } else {
                // Create token
                const token = jwt.sign(
                    { 
                        userID: result.id,
                        email: result.email,
                    }, 
                    process.env.JWT_SECRET,
                    {
                        expiresIn: '1h',
                    }
                )
    
                // send token
                return res.status(200).send(token);
            }
            
        } catch (err) {
            console.log(err);
            return res.status(400).send("Something went wrong");
        }
    }
}