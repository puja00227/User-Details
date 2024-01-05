import express from "express";
import { PORT, mongoURL } from "./config.js";
import mongoose from "mongoose";
import UserRoutes from "./routes/UserRoutes.js"
import SignUpRoutes from "./routes/SignUpRoutes.js"
import cors from 'cors';

const app = express();
app.use(express.json());

app.use(cors());

app.use('/users', UserRoutes);
app.use('/users', SignUpRoutes);

app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('Welcome to MERN Stack.');
});

mongoose.connect(mongoURL)
    .then(() => {
        console.log('App connected to the database.');
        app.listen(PORT, () => {
            console.log(`App is listening on port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });
