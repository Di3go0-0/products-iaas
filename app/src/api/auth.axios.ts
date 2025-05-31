import axios from "axios";

const API_BASE_URL = "http://10.101.90.23:3010/auth";

const instance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

export default instance;
