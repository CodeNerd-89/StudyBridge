import express from 'express';
import cors from 'cors';

import apiRoutes from './routes/index.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'StudyBridge API is running',
  });
});

app.use('/api', apiRoutes);

export default app;
