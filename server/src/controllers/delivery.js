import { getAllCities } from '../services/delivery.js';

export const getCitiesController = async (req, res) => {
  const { CityName = '', Page = 1 } = req.query;

  const cities = await getAllCities({ CityName, Page });

  res.status(200).json({
    status: 200,
    message: 'Successfully found cities!',
    data: cities,
  });
};
