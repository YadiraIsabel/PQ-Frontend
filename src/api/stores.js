import axios from "./axios";

export const getStoresRequest = () => axios.get('/tiendas');
export const getStoreRequest = (id) => axios.get('/tiendas/' + id);
export const createStoreRequest = (store) => axios.post('/tiendas', store);
export const deleteStoreRequest = (id) => axios.delete('/tiendas/' + id);
export const updateStoreRequest = (id, store) => axios.put('/tiendas/' + id, store);
