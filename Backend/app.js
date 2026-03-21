import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './db/db.js';
import { registerUser } from './controller/user.controller.js';  // ✅ Fixed named import
import userRoutes from './routes/user.routes.js';

dotenv.config();

const app = express();  // ✅ Moved before usage

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.post('/api/users/register', registerUser);  // ✅ works now

app.listen(process.env.PORT, () => {
    console.log(`✅ Server is running on port ${process.env.PORT}`);
});

export default app;
