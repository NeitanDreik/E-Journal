import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import apiRoutes from './routes/api.js';
import authRoutes from './routes/auth.js';
dotenv.config();

const app = express();
const corsOptions = {
  exposedHeaders: 'auth-token',
};
app.use(
  express.json({
    extended: true,
    limit: '30mb',
  })
);
app.use(
  express.urlencoded({
    extended: true,
    limit: '30mb',
  })
);

app.use(cors(corsOptions));
app.use('/api', apiRoutes);
app.use('/auth', authRoutes);
const CONNECTION_URL = process.env.DB_CONNECT;
const PORT = 8000;

mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

mongoose.set('useFindAndModify', false);
