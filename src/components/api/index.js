import { BASE_URL } from "./base";
import Cookies from 'js-cookie';
import axios from "axios";
axios.defaults.withCredentials = true


const API = axios.create({ baseURL: BASE_URL });

// API.interceptors.request.use((req) => {
//     if (Cookies.get("accessToken")) {
//       req.headers.authorization =
//         Cookies.get("accessToken");
//     }
//     return req;
//   });


export const userRegisterApi = (data) => API.post("/register", data);
export const userLoginApi = (data) => API.post("/login", data);
export const getAllPokemons = (data) => API.get("/pokemons", data);