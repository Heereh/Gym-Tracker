import axios from 'axios';
import authApi from './apiClient';

export const createUser = async (userData) => {
  try {
    const response = await authApi.post('/auth/register', userData);
    return response.data;
  } catch (error) {
    console.log(error);

    throw error.response?.data || error;
  }
};

export const loginUser = async (userData) => {
  try {
    const response = await authApi.post('/auth/login', userData);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error.response?.data || error;
  }
};
