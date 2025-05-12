import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

export const fetchSuppliers = async () => {
  const response = await axios.get(`${API_URL}/suppliers/`);
  return response.data;
};

export const createSupplier = async (supplier) => {
  const response = await axios.post(`${API_URL}/suppliers/`, supplier);
  return response.data;
};