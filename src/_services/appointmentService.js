import axios from "axios";
import { global } from "../_global/global";

const appointmentService = {};

appointmentService.getPatientsAppointments = async (token, patientId) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return (await axios.get(global.BASE_URL + `/users/appointments/checkall/${patientId}`, config)).data;
};

appointmentService.getAppointementsDoctor = async (token, doctorId) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return (await axios.get(global.BASE_URL + `/users/appointments/checkalldoctors/${doctorId}`, config))
    .data;
};

appointmentService.createAppointment = async (token, data) =>{
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const body = {
    id_doctors: data.id_doctors,
    date: data.date,
    time: data.horario
  }
  return (await axios.post(global.BASE_URL + `/appointments/createappointment`, body, config))
    .data;
}

appointmentService.updateAppointment = async (token, data, idAppointment) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const body = {
    date: data.date,
    time: data.time,
  };
  return (
    await axios.put(
      global.BASE_URL + `/appointments/updateappointment/${idAppointment}`,
      body,
      config
    )
  ).data;
};

appointmentService.deleteAppointment = async (token, idAppointment) => {
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