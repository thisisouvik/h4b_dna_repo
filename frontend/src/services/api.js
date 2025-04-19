import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const testBackend = async () => {
  try {
    const response = await api.get('/test');
    return response.data;
  } catch (error) {
    console.error('Error testing backend:', error);
    throw error;
  }
};

export const encodeDNA = async (data) => {
  try {
    const response = await api.post('/encode', data);
    return response.data;
  } catch (error) {
    console.error('Error encoding DNA:', error);
    throw error;
  }
};

export const decodeDNA = async (data) => {
  try {
    const response = await api.post('/decode', data);
    return response.data;
  } catch (error) {
    console.error('Error decoding DNA:', error);
    throw error;
  }
}; 