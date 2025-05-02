import axios from "axios";

const API_BASE = 'http://localhost:8000';

const addProduct = async (data:any) => {
    return await axios.post(`${API_BASE}/api/products`, data);
};

const getProducts = async () => {
    const response = await axios.get(`${API_BASE}/api/products`);
    const result = response.data
    return result
  };

const editProduct = async (data:any) => {
  return await axios.post(`${API_BASE}/api/editproduct`, data);
}

export {
    addProduct,
    getProducts,
    editProduct
}