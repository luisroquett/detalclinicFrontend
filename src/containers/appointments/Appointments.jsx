import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Appointments.scss";
import { DataListTable } from "../../components";
import appointmentService from "../../_services/appointmentService";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default function Citas() {
  // HOOKS
  const authState = useSelector((state) => state.auth);
  const [appointments, setAppointments] = useState([]);
  const [appointmentId, setAppointmentsId] = useState();
  const [showForm, setShowForm] = useState(false);
  const [formValues, setFormValues] = useState({});
  const isLoggedIn = authState.isLoggedIn;
  const isPatient = authState.userInfo.role == "patient";
  const isDoctor = authState.userInfo.role == "doctor";
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn && isPatient) {
      getAppointmentPatient(authState.userToken, authState.userInfo.id);
    } else if (isLoggedIn && isDoctor) {
      getAppointmentDoctor(authState.userToken, authState.userInfo.id);
    } else {
      navigate("/");
    }
  }, []);

  // FUNCTIONS
  const getAppointmentPatient = async (token, patientId) => {
    try {
      const response = await appointmentService.getPatientsAppointments(
        token,
        patientId
      );

      setAppointments(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAppointmentDoctor = async (token, doctorId) => {
    try {
      const response = await appointmentService.getAppointementsDoctor(
        token,
        doctorId
      );

      setAppointments(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateAppointment = async (token, appointData, appointId) => {
    try {
      await appointmentService.updateAppointment(token, appointData, appointId);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteAppointment = async (token, appointId) => {
    try {
      await appointmentService.deleteAppointment(token, appointId);
    } catch (error) {
      console.log(error);
    }
  };

  // HANDLERS
  const handleAppointment = (e) => {
    const { dataId } = e.currentTarget.dataset;

    setAppointmentsId(dataId);
    setShowForm(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleShowForm = () => {
    setShowForm(false);
  };

  const handleSubmit = () => {
    updateAppointment(authState.userToken, formValues, appointmentId);
  };

  const handleDelete = () => {
    deleteAppointment(authState.userToken, appointmentId);
    window.location.reload();
  };

  // RETURN
  return (
    <div className="container Appointments">
      <DataListTable
        data={appointments}
        title="Appointment"
        headers={["ID Appointment", "ID Patient", "ID Doctor", "Time", "Date"]}
        attributes={["id", "id_patients", "id_doctors", "time", "date"]}
        onChange={handleAppointment}
      />
      {showForm && (
        <div className="updateFormDates">
          <h2>Modificar la cita con ID: {appointmentId}</h2>
          <Form onSubmit={handleSubmit} className="updateForm">
            <Form.Group className="mb-4">
              <Form.Label>Nueva Fecha</Form.Label>
              <Form.Control
                type="date"
                name="fecha"
                value={formValues.fecha}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Chosse the date</Form.Label>
              <br />
              <Form.Check
                required
                inline
                type={"radio"}
                name="horario"
                value="15:45:00"
                label={`15:45`}
                onChange={handleChange}
              />
              <Form.Check
                inline
                type={"radio"}
                name="horario"
                value="10:00:00"
                id={2}
                label={`10:00`}
                onChange={handleChange}
              />
              <Form.Check
                inline
                type={"radio"}
                name="horario"
                value="11:30:00"
                label={`11:30`}
                onChange={handleChange}
              />
            </Form.Group>

            <div className="updateDateButtons">
              <Button variant="primary" type="submit" className="formButton">
                Change appointment
              </Button>
              <Button
                variant="success"
                onClick={handleShowForm}
                className="formButton"
              >
                Update appointment
              </Button>
              <Button
                variant="danger"
                onClick={handleDelete}
                className="formButton"
              >
                Delete appointment
              </Button>
            </div>
          </Form>
        </div>
      )}
    </div>
  );
}
