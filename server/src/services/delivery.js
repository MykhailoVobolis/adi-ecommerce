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

export const getWarehousesOfCity = async ({ CityRef, FindByString }) => {
  const response = await instance.post('', {
    apiKey,
    modelName: 'AddressGeneral',
    calledMethod: 'getWarehouses',
    methodProperties: {
      FindByString,
      CityRef,
      Language: 'UA',
    },
  });

  return response.data;
};

export const getDeliveryCost = async ({
  Cost,
  CityRecipient,
  ServiceType = 'WarehouseWarehouse',
  SeatsAmount = '1',
}) => {
  const response = await instance.post('', {
    apiKey,
    modelName: 'InternetDocument',
    calledMethod: 'getDocumentPrice',
    methodProperties: {
      CitySender: '8d5a980d-391c-11dd-90d9-001a92567626', // Київ Ідентификатор (REF) міста відправника
      CityRecipient, // Ідентифікатор (REF) міста отримувача
      Weight: '1.8', // Вага посилки в кг
      ServiceType, // Тип доставки (WarehouseWarehouse, DoorsWarehouse, тощо)
      Cost, // Оголошена вартість (для страховки та післяплати)
      CargoType: 'Parcel', // Тип вантажу (Parcel, Cargo, Documents, Pallet, Money)
      SeatsAmount, // Кількість місць
      RedeliveryCalculate: {
        // Зворотня доставка
        CargoType: 'Money', // Тип вантажу (Parcel, Cargo, Documents, Pallet, Money)
        Amount: Cost, // Ціле число (сума зворотньої доставки)
      },
    },
  });

  return response.data;
};
