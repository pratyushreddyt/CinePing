require('./src/config/env');
const connectDB = require('./src/config/db');
const app = require('./src/app');
const runAlertJob = require('./src/jobs/alertJob');

const PORT = process.env.PORT || 4000;

connectDB();

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

runAlertJob();
