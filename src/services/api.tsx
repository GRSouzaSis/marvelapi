import axios from 'axios';
import md5 from 'md5';
import {PUBLIC_KEY, PRIVATE_KEY, TS} from '@env';

const hash = md5(TS+PRIVATE_KEY+PUBLIC_KEY);

const api = axios.create({baseURL: `http://gateway.marvel.com/v1/public/comics?ts=${TS}&apikey=${PUBLIC_KEY}&hash=${hash}`})
api.interceptors.request.use(config=> {
  config.params = config.params || {};
  // config.params.apikey = API_KEY;
  config.params.hash = hash;
  // config.params.ts = ts;
  return config;
})

export default api;