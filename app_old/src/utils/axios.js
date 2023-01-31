import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const http = axios.create({
  // baseURL: 'http://165.232.148.189:3000/',
  baseURL: `${process.env.REACT_APP_API_URL}`,
  timeout: 5000,
  headers: {
    Accept: 'application/json'
  }
});

export default http;
