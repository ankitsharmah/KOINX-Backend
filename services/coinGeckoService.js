import axios from 'axios'
export const fetchCryptoData = async (coinIds) => {
    try {
      const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price`, {
        params: {
          ids: coinIds.join(','),
          vs_currencies: 'usd',
          include_market_cap: 'true',
          include_24hr_change: 'true',
        },
      });
      console.log(response.data)
      return response.data;
    } catch (error) {
      console.error('Error fetching data from CoinGecko:', error.message);
      throw error;
    }
  };