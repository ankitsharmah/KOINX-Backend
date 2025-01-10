import { CryptoData } from '../models/CryptoData.js'; 
import { calculateStandardDeviation } from '../utils/mathUtils.js';

export const getDeviation = async (req, res) => {
  try {
    const { coin } = req.query;
    const records = await CryptoData.find({ coin }).sort({ timestamp: -1 }).limit(100);

    if (records.length < 2) {
      return res.status(400).json({ message: 'Not enough data to calculate standard deviation' });
    }

    const prices = records.map(record => record.price);
    const deviation = calculateStandardDeviation(prices);

    res.json({ deviation });
  } catch (error) {
    console.error('Error in deviation API:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

