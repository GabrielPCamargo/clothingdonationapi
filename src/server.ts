import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';
dotenv.config();

const app = express();

mongoose
  .connect(process.env.CONNECTIONSTRING || '')
  .then(() => {
    app.emit('database-connection');
  })
  .catch((e) => console.log(e));

app.use(cors());
app.use(express.json());
app.use(userRoutes);

app.on('database-connection', () => {
  app.listen(process.env.PORT || 3000, () => {
    console.log(
      'Server running on port: http://localhost:' + process.env.PORT || 3000
    );
  });
});
