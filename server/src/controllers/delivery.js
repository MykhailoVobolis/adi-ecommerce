import { getAllCities, getWarehousesOfCity } from '../services/delivery.js';

export const getCitiesController = async (req, res) => {
  const { name: CityName = '', page: Page = 1 } = req.query;

  const popularCityNames = ['Київ', 'Харків', 'Одеса', 'Дніпро', 'Запоріжжя', 'Львів', 'Миколаїв'];

  let popularCities = [];

  if (CityName === '' && Number(Page) === 1) {
    const popularResults = await Promise.all(
      popularCityNames.map(async (name) => {
        const city = await getAllCities({ CityName: name, Page: '1' });
        const uniqueCity = city.data.find((item) => item.Description === name);

        return uniqueCity;
      }),
    );

    popularCities = popularResults.filter((item) => item && item.Ref);
  }

  const cities = await getAllCities({ CityName, Page });

  if (popularCities.length > 0 && Array.isArray(cities.data)) {
    cities.data = [...popularCities, ...cities.data];
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully found cities!',
    data: cities,
  });
};

export const getWarehousesOfCityController = async (req, res) => {
  const { CityRef = '', TypeOfWarehouseRef = '' } = req.query;

  const warehousesResponse = await getWarehousesOfCity({ CityRef, TypeOfWarehouseRef });
  const warehouses = warehousesResponse.data || [];

  const hasBranch = warehouses.some((i) => i.CategoryOfWarehouse === 'Branch' || 'Store');
  const hasPostomat = warehouses.some((i) => i.CategoryOfWarehouse === 'Postomat');
  const hasCourier = hasBranch;

  res.status(200).json({
    status: 200,
    message: 'Successfully found warehouses types!',
    data: {
      hasBranch,
      hasPostomat,
      hasCourier,
    },
  });
};
