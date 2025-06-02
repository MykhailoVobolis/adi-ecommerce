import axios from 'axios';

export const handleError = (error) => {
  let errorMessage = 'An unknown error occurred';

  if (axios.isAxiosError(error) && error.response) {
    errorMessage = error.response.data.data.message || error.message;
  } else if (error) {
    errorMessage = error.message;
  }

  return errorMessage;
};
