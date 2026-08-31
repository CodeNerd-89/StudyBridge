import './config/env.js';
import app from './app.js';
import { initBackgroundScheduler } from './services/backgroundSync.js';
import { ensureAdminUser } from './modules/auth/auth.service.js';

const port = process.env.PORT || 5001;

app.listen(port, async () => {
  console.log(`StudyBridge server running on port ${port}`);
  await ensureAdminUser();
  initBackgroundScheduler();
});
