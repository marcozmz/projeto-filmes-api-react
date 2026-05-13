import axios from 'axios';


const BASE_URL = 'https://6a04630d2afe8349b4b68876.mockapi.io/filmes';

const api = axios.create({
  baseURL: BASE_URL,
});

export default api;
