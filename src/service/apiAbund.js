import axios from 'axios';

const api = axios.create({
  baseURL: "http://localhost:5050",
});

const create = async (payload) => await api.post(`create-account/`, payload);

const getDetails = async (userId, id) => await api.get(`details-customer?userId=${userId}&id=${id}`);

const getToken = async (userId) => {
  const payload = { userId };
  const response = await api.post('mytoken', payload); 
  return response.data;
};

const createPaymentTree = async (id, quantity, country, taxIdentificationNumber, returnUrl, userId) => {
  const payload = { id, quantity, country, taxIdentificationNumber, returnUrl, userId };
  return await api.post('create-checkoutsession/', payload);
};

const getTree = async (userId, id) => {
  const payload = { userId, id };
  const response = await api.get('balance-tree', payload); 
  return response.data;
};

const getPaymentTree = async (userId, id) => {
  const payload = { userId, id };
  const response = await api.get('payment-customer', payload); 
  return response.data;
};

const createPaymentSubscription = async (id, subscriptionId, country, taxIdentificationNumber, returnUrl, userId) => {
  const payload = { id, subscriptionId, country, taxIdentificationNumber, returnUrl, userId };
  return await api.post('create-subscription/', payload);
};

const getAllSubscription = async (userId, id) => {
  const payload = { userId, id };
  const response = await api.get('subscription-customer', payload); 
  return response.data;
};

const manageSubscription = async (id, subscriptionId, subscriptionCancel, returnUrl, userId) => {
  const payload = { id, subscriptionId, subscriptionCancel, returnUrl, userId };
  return await api.post('portal-subscription/', payload);
};


export const abundanceService = {
  create,
  getDetails,
  getToken,
  createPaymentTree,
  getTree,
  getPaymentTree,
  createPaymentSubscription,
  getAllSubscription,
  manageSubscription
};
