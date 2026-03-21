import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import  connectdb  from './db/db.js';
import { registerUser,login,userprofile,logout } from './controller/user.controller.js';  // ✅ Fixed named import
import userRoutes from './routes/user.routes.js';
import captainRoutes from './routes/captain.routes.js';
import cookieparser from "cookie-parser"

dotenv.config();

const app = express();  // ✅ Moved before usage

connectdb();

app.use(cors());
app.use(express.json());
app.use(cookieparser());
app.use(express.urlencoded({ extended: true }));
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
    res.send('Hello World!')
});
app.post('/api/users/register', registerUser);  
app.post('/api/users/login', login); 
app.get('/api/users/profile',userprofile) 
app.get('/api/users/logout',logout)

export default app;
