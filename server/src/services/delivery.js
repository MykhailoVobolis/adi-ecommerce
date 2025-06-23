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
    calledMethod: 'getCities',
    methodProperties: {
      Page,
      FindByString: CityName,
      Limit: '100',
    },
  });

  return response.data;
};

export const getWarehousesOfCity = async ({ CityRef, TypeOfWarehouseRef }) => {
  const response = await instance.post('', {
    apiKey,
    modelName: 'AddressGeneral',
    calledMethod: 'getWarehouses',
    methodProperties: {
      FindByString: '',
      CityRef,
      Language: 'UA',
      TypeOfWarehouseRef,
    },
  });

  return response.data;
};
