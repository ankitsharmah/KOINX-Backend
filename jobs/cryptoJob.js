import cron from 'node-cron';
import { fetchCryptoData } from '../services/coinGeckoService.js';
import { CryptoData } from '../models/CryptoData.js';

const coins = ['bitcoin', 'matic-network', 'ethereum'];

export const fetchAndStoreCryptoData = async () => {
  try {
    const data = await fetchCryptoData(coins);

    for (const coin of coins) {
      const record = new CryptoData({
        coin,
        price: data[coin].usd,
        marketCap: data[coin].usd_market_cap,
        change24h: data[coin].usd_24h_change,
      });

      await record.save();
    }

    console.log('Crypto data saved successfully');
  } catch (error) {
    console.error('Error saving crypto data:', error.message);
  }
};

// Schedule the job to run every 2 hours
cron.schedule('0 */2 * * *', fetchAndStoreCryptoData);
