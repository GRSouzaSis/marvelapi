import axios from 'axios';
// import md5 from 'md5';
// import {Md5} from 'ts-md5/dist/md5'
import {PUBLIC_KEY, PRIVATE_KEY, TS} from '@env';

// async function hashCreate() {
//   let h = TS+PRIVATE_KEY+PUBLIC_KEY;
//   return Md5.hashStr(h);
// }
// const hash = hashCreate();

const api = axios.create({baseURL: `http://gateway.marvel.com/v1/public/stories?ts=1&apikey=1bfb49ed278e2c63a57469b936f3ef01&hash=e3a42df4cd74cbf5a3fcb85dd58e6f8b`})
// api.interceptors.request.use(config=> {
//   config.params = config.params || {};
//   // config.params.apikey = API_KEY;
//   // config.params.hash = hash;
//   // config.params.ts = ts;
//   return config;
// })

export default api;