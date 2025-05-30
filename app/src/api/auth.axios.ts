import axios from 'axios';

const API_BASE_URL = "http://localhost:3010/auth";

const instance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
})

export default instance;
