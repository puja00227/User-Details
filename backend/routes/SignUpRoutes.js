import express from "express";
import { SignUp } from "../models/SignUp.js";
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken";
const router = express.Router()
const JwtSecret = "YourSecureJWTSecretHere#$%"

function isAlphanumeric(str) {
    return /^[a-zA-Z0-9]+$/.test(str);
}


router.post("/signup", [
    body('Name').trim().notEmpty().withMessage('Name is too small'),
    body('Email').trim().isEmail().withMessage('Invalid Email Address').custom(value => {
        const [localPart, domainPart] = value.split('@');
        if (isAlphanumeric(localPart) || isAlphanumeric(domainPart)) {
            return true;
        }
        throw new Error('Email must be alphanumeric');
    }),
    body('Password').isLength({ min: 6 }).withMessage('Password is too small. Give Minimum 6 Characters.'),
    body('Phone').trim().isLength({ min: 10, max: 10 }).withMessage('Invalid Phone Number')
]
    , async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(200).json({ message: errors.array()[0].msg });
        }

        const salt = await bcrypt.genSalt(10)
        let securedPassword = await bcrypt.hash(req.body.Password, salt)

        try {
            const userEmail = await SignUp.findOne({ Email: req.body.Email })
            if (userEmail) {
                return res.status(200).json({ message: "Email already registered. Please Sign In." });
            }
            await SignUp.create({
                Name: req.body.Name,
                Email: req.body.Email,
                Password: securedPassword,
                Phone: req.body.Phone,
                Gender: req.body.Gender,
                Hear: req.body.Hear,
                City: req.body.City,
                State: req.body.State
            });
            res.json({ message: "Signed Up successfully. Please Sign In now.", success: true });
        }
        catch (error) {
            console.log(error)
            res.json({ message: "Invalid Credentials" });
        }
    })


router.post("/signin", [
    body('Email').isEmail().withMessage('Invalid Email Address'),
    body('Password').isLength({ min: 6 }).withMessage('Password is too small. Give Minimum 6 Characters.')
]
    , async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(200).json({ message: errors.array()[0].msg });
        }
        try {
            const userEmail = await SignUp.findOne({ Email: req.body.Email })
            if (!userEmail) {
                return res.status(200).json({ message: "Email Address not Registered. Please Sign Up first." });
            }
            const pwdCompare = await bcrypt.compare(req.body.Password, userEmail.Password)
            if (!pwdCompare) {
                return res.status(200).json({ message: "Incorrect Password" });
            }

            const data = { user: { id: userEmail.id } }
            const authToken = jwt.sign(data, JwtSecret)
            res.json({ message: `Welcome ${userEmail.Name}, you Signed In successfully.`, success: true, authToken: authToken });

        } catch (error) {
            console.log(error)
            res.json({ message: "Invalid Credentials" });
        }
    })

export default router;
