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

export const getDeliveryMethodsOfCityController = async (req, res) => {
  const { CityRef = '', Page = '', FindByString = '' } = req.query;

  const methodsResponse = await getWarehousesOfCity({ CityRef, Page, FindByString });
  const methods = methodsResponse.data || [];

  const hasBranch = methods.some((i) => i.CategoryOfWarehouse === 'Branch' || 'Store');
  const hasPostomat = methods.some((i) => i.CategoryOfWarehouse === 'Postomat');
  const hasCourier = hasBranch;

  res.status(200).json({
    status: 200,
    message: 'Successfully found delivery methods!',
    data: {
      hasBranch,
      hasPostomat,
      hasCourier,
    },
  });
};

export const getWarehousesOfCityController = async (req, res) => {
  const { CityRef = '', Page = '', FindByString = '', CategoryOfWarehouse } = req.query;

  const page = Number(Page) || 1;
  const limit = 100;

  const warehousesResponse = await getWarehousesOfCity({ CityRef, FindByString });

  let warehouses = warehousesResponse.data;

  if (CategoryOfWarehouse) {
    const category = CategoryOfWarehouse.toLowerCase();

    warehouses = warehouses.filter((warehouse) => {
      const warehouseCategory = warehouse.CategoryOfWarehouse?.toLowerCase();

      switch (category) {
        case 'postomat':
          return warehouseCategory === 'postomat';

        case 'branch':
          return warehouseCategory !== 'postomat';

        default:
          return true;
      }
    });
  }

  // Пагінація
  const totalCount = warehouses.length;
  const totalPages = Math.ceil(totalCount / limit);
  const hasNext = page * limit < totalCount;
  const hasPrev = page > 1;

  const paginated = warehouses.slice((page - 1) * limit, page * limit);

  res.status(200).json({
    status: 200,
    message: 'Successfully found warehouses!',
    meta: {
      totalCount,
      totalPages,
      hasNext,
      hasPrev,
      page,
      limit,
    },
    data: paginated,
  });
};
