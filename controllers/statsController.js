import { CryptoData } from "../models/CryptoData.js";

 export const getStats = async (req, res) => {
  try {
    const { coin } = req.query;
    const latestData = await CryptoData.findOne({ coin }).sort({ timestamp: -1 });
    if (!latestData) return res.status(404).json({ message: 'Data not found for the requested coin' });

    res.json({
      price: latestData.price,
      marketCap: latestData.marketCap,
      change24h: latestData.change24h,
    });
  } catch (error) {
    console.error('Error in stats API:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};


