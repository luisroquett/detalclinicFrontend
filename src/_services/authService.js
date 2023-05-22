import axios from "axios";
import { global } from "../_global/global";

const authService = {};

//Login de usuarios
authService.login = async (credentials) => {
  const body = {
    email: credentials.email,
    password: credentials.password,
  };

  return (await axios.post(global.BASE_URL + `/auth/login`, body)).data;
};

//registro de usuarios
authService.registerUser = async (credentials) => {

  const body = {
    nombre: credentials.nombre,
    apellidos: credentials.apellidos,
    email: credentials.email,
    telefono: credentials.telefono,
    password: credentials.password,
  };


  return (await axios.post(global.BASE_URL + `/auth/register`, body))
    .data;
}


export default authService