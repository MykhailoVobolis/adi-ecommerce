let store = null;

export const setStore = (reduxStore) => {
  store = reduxStore;
};

export const getStore = () => store;
