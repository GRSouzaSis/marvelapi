import axios from 'axios';

const api = axios.create({baseURL: `http://gateway.marvel.com/v1/public`});
api.interceptors.request.use(config =>{
  config.params = config.params || {};
  config.params.apikey = '1bfb49ed278e2c63a57469b936f3ef01';
  config.params.hash = 'fc0242429774e2f71ceaba3ab64cf7c1';
  config.params.ts = 'Givaldo';
  return config;
})

export default api;