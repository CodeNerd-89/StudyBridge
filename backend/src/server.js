import './config/env.js';
import app from './app.js';

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`StudyBridge server running on port ${port}`);
});
