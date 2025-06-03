import axios from "axios";

const API_BASE_URL = "http://10.221.217.123:3011/products";

const instance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

export default instance;
