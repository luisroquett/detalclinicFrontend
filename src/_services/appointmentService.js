import axios from "axios";
import { global } from "../_global/global";

const appointmentService = {};

appointmentService.getPatientsAppointments = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return (await axios.get(global.BASE_URL + `/users/appointments/checkall/`, config)).data;
};

appointmentService.getAppointementsDoctor = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return (await axios.get(global.BASE_URL + `/users/appointments/checkalldoctors/`, config))
    .data;
};

appointmentService.createCita = async (token, data) =>{
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const body = {
    id_odontologo: data.id_odontologo,
    fecha: data.fecha,
    horario: data.horario
  }
  return (await axios.post(global.BASE_URL + `/appointments/createappointment`, body, config))
    .data;
}

appointmentService.updateCita = async (token, data, idAppointment) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const body = {
    fecha: data.fecha,
    horario: data.horario,
  };
  return (
    await axios.put(
      global.BASE_URL + `/appointments/updateappointment/${idAppointment}`,
      body,
      config
    )
  ).data;
};

appointmentService.deleteCita = async (token, idAppointment) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return (
    await axios.delete(global.BASE_URL + `/appointments/deleteappointment/${idAppointment}`, config)
  ).data;
};

export default appointmentService;