import axios from "./axios";

export const getProductsRequest = (store) => axios.get('/' + store + '/productos');
export const getProductRequest = (store,id) => axios.get('/' + store + '/productos/' + id);
export const createProductRequest = (store,product) => axios.post('/' + store + '/productos', product);
export const deleteProductRequest = (store,id) => axios.delete('/' + store + '/productos/' + id);
export const updateProductRequest = (store,id, product) => axios.put('/' + store + '/productos/' + id, product);
