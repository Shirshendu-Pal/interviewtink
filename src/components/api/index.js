import { BASE_URL } from "./base";
import axios from "axios";
import Cookies from 'js-cookie';

const API = axios.create({ baseURL: BASE_URL });

API.interceptors.request.use((req) => {
    if (Cookies.get("accessToken")) {
      req.headers.authorization =
        Cookies.get("accessToken");
    }
    return req;
  });


export const userRegisterApi = (data) => API.post("/auth/register", data);
export const userLoginApi = (data) => API.post("/auth/login", data);
export const getAllPokemons = (data) => API.get("/pokemon/get-pokemons", data);