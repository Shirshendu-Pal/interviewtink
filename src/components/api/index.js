import { BASE_URL } from "./base";
import axios from "axios";

const API = axios.create({ baseURL: BASE_URL });

API.interceptors.request.use((req) => {
    if (localStorage.getItem("accessToken")) {
      req.headers.authorization =
        localStorage.getItem("accessToken");
    }
    return req;
  });


export const userRegisterApi = (data) => API.post("/auth/register", data);
export const userLoginApi = (data) => API.post("/auth/login", data);
export const getAllPokemons = (data) => API.get("/pokemon/get-pokemons", data);