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
  const [tableIdAttr_name, setTableIdAttr_name] = useState("");
  const [tableIdHead_name, setTableIdHead_name] = useState("");
  const [formValues, setFormValues] = useState({});
  const isLoggedIn = authState.isLoggedIn;
  const isPatient = authState.userInfo.role == "user";
  const isDoctor = authState.userInfo.role == "doctor";
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn && isPatient) {
      getAppointmentPatient(authState.userToken);
      setTableIdAttr_name("id_doctor");
      setTableIdHead_name("ID Doctor");
    } else if (isLoggedIn && isDoctor) {
      getAppointmentDoctor(authState.userToken);
      setTableIdAttr_name("id_paciente");
      setTableIdHead_name("ID Paciente");
    } else {
      navigate("/");
    }
  }, []);

  // FUNCTIONS
  const getAppointmentPatient = async (token) => {
    try {
      const response = await appointmentService.getAppointmentPatient(token);

      setAppointments(response.appointments);
    } catch (error) {
      console.log(error);
    }
  };

  const getAppointmentDoctor = async (token) => {
    try {
      const response = await appointmentService.getAppointmentDoctor(token);

      setAppointments(response.appointments);
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

  const newAppointments = (appointments) =>
    appointments.map((cita) => {
    

      return cita;
    });

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
      d
      <DataListTable
        data={newAppointments(appointments)}
        title="Appointment"
        headers={[
          "ID Cita",
          tableIdHead_name,
          "Fecha",
          "Hora",
                ]}
        attributes={[
          "id",
          tableIdAttr_name,
          "fecha",
          "horario",
        ]}
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
              <Form.Label>Elegir horario</Form.Label>
              <br />
              <Form.Check
                inline
                type={"radio"}
                name="horario"
                value="15:45:00"
                onChange={handleChange}
                label={`15:45`}
              />
              <Form.Check
                inline
                type={"radio"}
                name="horario"
                value="10:00:00"
                onChange={handleChange}
                id={2}
                label={`10:00`}
              />
              <Form.Check
                inline
                type={"radio"}
                name="horario"
                value="11:30:00"
                onChange={handleChange}
                label={`11:30`}
              />
            </Form.Group>

                  
            <div className="updateDateButtons">
              <Button variant="primary" type="submit" className="formButton">
                Change appointment
              </Button>
              <Button variant="success" onClick={handleShowForm} className="formButton">
                Update appointment
              </Button>
              <Button variant="danger" onClick={handleDelete} className="formButton">
                Delete appointment
              </Button>
            </div>
          </Form>
        </div>
      )}
    </div>
  );
}
