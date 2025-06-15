import axios from 'axios';
import { env } from '../utils/env.js';

const baseURL = env('NOVA_POST_API_BASE_URL');
const apiKey = env('NOVA_POST_API_KEY');

const instance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getAllCities = async ({ CityName, Page }) => {
  const response = await instance.post('', {
    apiKey,
    modelName: 'AddressGeneral',
    calledMethod: 'getSettlements',
    methodProperties: {
      Page,
      Warehouse: '1',
      FindByString: CityName,
      Limit: '100',
    },
  });

  return response.data;
};
