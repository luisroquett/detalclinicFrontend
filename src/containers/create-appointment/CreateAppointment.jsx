import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import appointmentService from "../../_services/appointmentService";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default function CreateAppoint() {
  // HOOKS
  const authState = useSelector((state) => state.auth);
  const [formValues, setFormValues] = useState({});
  const isLoggedIn = authState.isLoggedIn;
  const isPatient = authState.userInfo.role == "user";
  const [isAppointCreated, setIsAppointCreated] = useState(false);
  const [showForm, setShowForm] = useState(true);
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn && !isPatient) {
      navigate("/");
    }
  }, []);

  // FUNCTIONS
  const createAppointment = async (token, body) => {
    try {
      await appointmentService.createAppointment(token, body);
    } catch (error) {
      console.log(error);
    }
  };

  // HANDLERS
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      createAppointment(authState.userToken, formValues);
      setIsAppointCreated(true);
      setShowForm(false);
    }

    setValidated(true);
  };

  const handleShowForm = () => {
    setShowForm(true);
    setIsAppointCreated(false);
  };
  // RETURN
  return (
    <div className="container CreateAppoint">
      {isAppointCreated && (
        <>
          <h2>Appointment created</h2>
          <Button variant="light" onClick={handleShowForm}>
          Create new appointment
          </Button>
        </>
      )}
      {showForm && (
        <>
          <h1>Make an appointment with us</h1>
          <Form
            className="updateForm"
            onSubmit={handleSubmit}
            noValidate
            validated={validated}
          >
            <Form.Group className="mb-4">
              <Form.Label style={{color: "rgb(33, 96, 231)"}}>Nueva Fecha</Form.Label>
              <Form.Control
                required
                type="date"
                name="date"
                value={formValues.fecha}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Schedules available</Form.Label>
              <br />
              <Form.Check
                required
                inline
                type={"radio"}
                name="time"
                value="09:15:00"
                label={`9:15AM`}
                onChange={handleChange}
              />
              <Form.Check
                required
                inline
                type={"radio"}
                name="time"
                value="10:15:00"
                label={`10:15AM`}
                onChange={handleChange}
              />
              <Form.Check
                inline
                type={"radio"}
                name="time"
                value="16:00:00"
                label={`4:00PM`}
                onChange={handleChange}
              />
              <Form.Check
                inline
                type={"radio"}
                name="time"
                value="19:30:00"
                label={`7:30PM`}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>Elige el Doctor</Form.Label>
              <Form.Check
                required
                type={"radio"}
                name="id_doctors"
                value={1}
                label={`Gerardo Martinez`}
                onChange={handleChange}
              />
              <Form.Check
                type={"radio"}
                name="id_doctors"
                value={2}
                label={`Padula Rumiel`}
                onChange={handleChange}
              />
            </Form.Group>

          

            
            <div className="appointButton">
              <Button variant="primary" type="submit" className="formButton">
                Create appointment
              </Button>
            </div>
          </Form>
        </>
      )}
    </div>
  );
}
