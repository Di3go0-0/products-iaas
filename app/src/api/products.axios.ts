import axios from 'axios';

const API_BASE_URL = "http://localhost:3011/products";

const instance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
})

export default instance;
