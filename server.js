import dotenv from 'dotenv';

import {connectDB} from'./config/db.js';
import app from './app.js';
import {fetchAndStoreCryptoData} from './jobs/cryptoJob.js';
dotenv.config();

const PORT = process.env.PORT || 9797;

connectDB();
fetchAndStoreCryptoData(); // Run job once at startup

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
