import axios from "./axios";

export const getCountsRequest = () => axios.get('/cuentas');
export const getCountRequest = (id) => axios.get('/cuentas/' + id);
export const createCountRequest = (count) => axios.post('/cuentas', count);
export const deleteCountRequest = (id) => axios.delete('/cuentas/' + id);
export const updateCountRequest = (id, count) => axios.put('/cuentas/' + id, count);
