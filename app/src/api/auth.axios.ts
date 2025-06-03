import axios from "axios";

const API_BASE_URL = "http://10.221.217.20:3010/auth";

const instance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

export default instance;
