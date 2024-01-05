import express from "express";
import { Users } from "../models/UserModels.js";
import { SignUp } from "../models/SignUp.js";
import { body, validationResult } from 'express-validator';
const router = express.Router()

function isAlphanumeric(str) {
    return /^[a-zA-Z0-9]+$/.test(str);
}


// create a new User
router.post('/', [
    body('Name').trim().notEmpty().withMessage('Name is too small'),
    body('Email').trim().isEmail().withMessage('Invalid Email Address').custom(value => {
        const [localPart, domainPart] = value.split('@');
        if (isAlphanumeric(localPart) || isAlphanumeric(domainPart)) {
            return true;
        }
        throw new Error('Email must be alphanumeric');
    }),
    body('Phone').trim().isLength({ min: 10, max: 10 }).withMessage('Invalid Phone Number')
],
    async (request, response) => {
        const errors = validationResult(request);
        try {
            if (!errors.isEmpty()) {
                return response.status(200).json({ message: errors.array()[0].msg });
            }
            let eId = await SignUp.findOne({ 'Email': request.body.signEmail })
            if (eId) {
                let userId = eId._id.toString()

                const newUser = await Users.create({
                    UserId: userId,
                    Name: request.body.Name,
                    Email: request.body.Email,
                    Phone: request.body.Phone
                });
                if (newUser) {
                    await SignUp.findOneAndUpdate(
                        { _id: userId },
                        {
                            $push: { usersDetails: newUser },
                        }
                    );
                    return response.status(201).send({ message: `User Created Successfully`, success: true });
                }
            }
            else { return response.status(404).json({ message: 'User not found' }); }
        } catch (error) {
            console.log(error.message);
            response.status(500).send({ message: error.message });
        }
    });


// Get All Users from database
router.post('/alluser', async (request, response) => {
    try {
        let query = Users.find();
        if (request.body.sort === 'A-Z') {
            query = query.sort({ Name: 1 });
        } else if (request.body.sort === 'Z-A') {
            query = query.sort({ Name: -1 });
        } else if (request.body.sort === 'lastModified') {
            query = query.sort({ updatedAt: -1 });
        } else if (request.body.sort === 'lastInserted') {
            query = query.sort({ createdAt: -1 });
        }
        const data = await query.exec();

        if (request.body.id === 'alluser') {
            return response.status(200).json({ count: data.length, data, success: true });
        }
        const eId = await SignUp.findOne({ 'Email': request.body.signEmail });
        if (eId) {
            const allUser = data.filter(user => user.UserId.toString() === eId._id.toString());
            return response.status(200).json({ count: allUser.length, data: allUser, success: true });
        } else {
            return response.status(200).json({ count: 0, success: true });
        }
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});


// router.post('/alluser', async (request, response) => {
//     try {
//         let query = Users.find();
//         if (request.body.sort === 'A-Z') {
//             query = query.sort({ Name: 1 });
//         } else if (request.body.sort === 'Z-A') {
//             query = query.sort({ Name: -1 });
//         } else if (request.body.sort === 'lastModified') {
//             query = query.sort({ updatedAt: -1 });
//         } else if (request.body.sort === 'lastInserted') {
//             query = query.sort({ createdAt: -1 });
//         }
//         const data = await query.exec();

//         const eId = await SignUp.findOne({ 'Email': request.body.signEmail });
//         if (eId) {
//             const allUser = [];
//             for (let i = 0; i < data.length; i++) {
//                 if (data[i].UserId.toString() === eId._id.toString()) {
//                     allUser.push(data[i]);
//                 }
//             }
//             return response.status(200).json({ count: allUser.length, data: allUser, success: true });
//         } else {
//             return response.status(200).json({ count: 0, success: true });
//         }
//     } catch (error) {
//         console.log(error.message);
//         response.status(500).send({ message: error.message });
//     }
// });


// Get One User from database by id
router.get('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const user = await Users.findById(id);
        if (!user) {
            return response.status(200).json({ message: 'User not found' });
        }
        return response.status(200).json({ data: user, success: true });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});


// Route for Update a User
router.put('/:id', async (request, response) => {
    try {
        if (!request.body.Name || !request.body.Email || !request.body.Phone) {
            return response.status(400).send({ message: 'All fields are required: User Name, Email Address, Phone Number' });
        }
        const { id } = request.params;
        const result = await Users.findByIdAndUpdate(id, request.body);
        if (!result) {
            return response.status(404).json({ message: 'User Not Found' });
        }
        return response.status(200).send({ message: 'User Updated Successfully', success: true });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});


// Route for Delete a User
router.post('/delete/:id', async (request, response) => {
    try {
        const { id } = request.params;
        let eId = await SignUp.findOne({ 'Email': request.body.signEmail })
        let userIds = eId._id.toString()
        let array = eId.usersDetails
        let index = array.indexOf(id);
        array.splice(index, 1);

        const result = await Users.findByIdAndDelete(id);
        const result2 = await SignUp.findOneAndUpdate(
            { _id: userIds },
            {
                usersDetails: array,
            }
        );
        if (result && result2) {
            return response.status(200).send({ message: 'User Deleted Successfully', success: true });
        }
        return response.status(404).json({ message: 'User Not Found' });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});


export default router;
