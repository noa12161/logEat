import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'https://food-app.herokuapp.com/api',
});
