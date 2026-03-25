import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import  connectdb  from './db/db.js';
import { registerUser,login,userprofile,logout } from './controller/user.controller.js'; 
import {registercaptain,logincaptain} from './controller/captain.controller.js';
import userRoutes from './routes/user.routes.js';
import captainRoutes from './routes/captain.routes.js';
import mapRoutes from './routes/map.routes.js';
import cookieparser from "cookie-parser"


dotenv.config();

const app = express();  

connectdb();

app.use(cors());
app.use(express.json());
app.use(cookieparser());
app.use(express.urlencoded({ extended: true }));
app.use('/api/users', userRoutes);
app.use('/api/captains', captainRoutes);
app.use('/api/map', mapRoutes);

app.get('/', (req, res) => {
    res.send('Hello World!')
});


export default app;
