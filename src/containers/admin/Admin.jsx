import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import userService from "../../_services/userService";
import { DataListTable } from "../../components/";


export default function Admin() {
  // HOOKS
  const [patients, setPatients] = useState([]);
  const [patientsPage, setPatientsPage] = useState(1);
  const [patientsCount, setPatientsCount] = useState(1);
  const [totalPagesPatients, setTotalPagesPatients] = useState(1);

  const [doctors, setDoctors] = useState([]);
  const [doctorsPage, setDoctorsPage] = useState(1);
  const [doctorsCount, setDoctorsCount] = useState(1);
  const [totalPagesDoctors, setTotalPagesDoctors] = useState(1);

  const navigate = useNavigate();
  const authState = useSelector((state) => state.auth);

  const isAdmin = authState.userInfo.role == "3";

  useEffect(() => {
    console.log('Bienvenido adimin');
    console.log(authState)
    if (isAdmin) {
      getAllPatients(authState.userToken, patientsPage);
      getAllDoctors(authState.userToken, doctorsPage);
          } else {
      navigate("/");
    }
  }, [patientsPage, doctorsPage]);

  // HANDLERS
  const handleUsersList = (e) => {
    const { page, dataId } = e.currentTarget.dataset;

    handleUsersListPagination(page);
    // handleSingleUser(dataId);
  };

  const handleDoctorsList = (e) => {
    const { page, dataId } = e.currentTarget.dataset;

    handleDoctorsListPagination(page);
    // handleSingleDoctor(dataId);
  };

  const handleUsersListPagination = (page) => {
    switch (page) {
      case "next":
        return setPatientsPage((page) => page + 1);
      case "prev":
        return setPatientsPage((page) => page - 1);
      case "first":
        return setPatientsPage(1);
      case "last":
        return setPatientsPage(totalPagesPatients);
    }
  };

  const handleDoctorsListPagination = (page) => {
    switch (page) {
      case "next":
        return setDoctorsPage((page) => page + 1);
      case "prev":
        return setDoctorsPage((page) => page - 1);
      case "first":
        return setDoctorsPage(1);
      case "last":
        return setDoctorsPage(totalPagesDoctors);
    }
  };

  
  // FUNCTIONS
  const getAllPatients = async (token, page) => {
    try {
      const response = await userService.getAllPatients(token, page);

      setPatients(response.results);
      setPatientsCount(response.info.total_results);
      setTotalPagesPatients(response.info.total_pages);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllDoctors = async (token, page) => {
    try {
      const response = await userService.getAllDoctors(token, page);

      setDoctors(response.results);
      setDoctorsCount(response.info.total_results);
      setTotalPagesDoctors(response.info.total_pages);
    } catch (error) {
      console.log(error);
    }
  };

  const newDoctors = (users) =>
    users.map((user) => {
      user.nombre = user.Doctor.nombre;
      user.apellidos = user.Doctor.apellidos;
      user.email = user.Doctor.email;
      user.telefono = user.Doctor.telefono;
      return user;
    });

  const newPatients = (users) =>
    users.map((user) => {
      user.nombre = user.User.nombre;
      user.apellidos = user.User.apellidos;
      user.email = user.User.email;
      user.telefono = user.User.telefono;
      return user;
    });

  // RETURN
  return (
    <>
      {isAdmin && (
        <div className="container Admin">
          <div className="title">
            <h1 className="text-center title">Panel de Admin</h1>
          </div>

          <DataListTable
            data={newDoctors(doctors)}
            title="Doctors"
            headers={["ID", "Nombre", "Apellido", "Email", "Teléfono"]}
            attributes={[
              "id",
              "nombre",
              "apellidos",
              "email",
              "telefono",
            ]}
            pagination={{
              page: doctorsPage,
              count: doctorsCount,
              totalPages: totalPagesDoctors,
            }}
            onChange={handleDoctorsList}
          />

          <br />

          <DataListTable
            data={newPatients(patients)}
            title="Pacientes"
            headers={["ID", "Nombre", "Apellido", "Email", "Teléfono"]}
            attributes={[
              "id",
              "nombre",
              "apellidos",
              "email",
              "telefono",
            ]}
            pagination={{
              page: patientsPage,
              count: patientsCount,
              totalPages: totalPagesPatients,
            }}
            onChange={handleUsersList}
          />
        </div>
      )}
    </>
  );
}
