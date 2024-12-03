import axios from 'axios';

const api = axios.create({
  baseURL: "https://api4242",
});


const getPayments = async (customerId) => {
    try {
      const url = `/payments?customerId=${customerId}`;
  
      const response = await api.get(url);
  
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar os pagamentos:", error);
      throw error;
    }
  };


const getInfoSubscription = async (customerId) => {
  const response = await api.get(`subscription-info?customerId=${customerId}`);
  return response.data;
};

const createportal = async (customerId) => {
  const payload = { customerId };
  return await api.post('create-portal/', payload);
};


  export const stripeService = {
    getPayments,
    getInfoSubscription,
    createportal
  };
  