import React, { useState } from "react";

import {
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBInput,
} from "mdb-react-ui-kit";
import Button from "react-bootstrap/Button";
import authService from "../../_services/authService";
import Form from "react-bootstrap/Form";
import registerImage from "../../assets/register_logo.png";
import validator from "validator";
import "./Registers.scss";

export default function Register() {
  // HOOKS
  const [formValues, setFormValues] = useState({});
  const [showForm, setShowForm] = useState(true);
  const [validated, setValidated] = useState(false);
  const [registerError, setRegisterError] = useState(null);

  // FUNCTIONS

  const registerUser = async (credentials) => {
    await authService.registerUser(credentials);
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
      registerUser(formValues);
      setShowForm(false);
    }
    setValidated(true);

    if (formValues.password) {
      if (
        !validator.isByteLength(formValues.password, { min: 8, max: undefined })
      ) {
        setRegisterError("La contraseña debe contener mínimo 8 caracteres");
      } else if (
        validator.isByteLength(formValues.password, { min: 8, max: undefined })
      ) {
        setRegisterError(null);
      }
    }
  };
  return (
    
    <div className="Register container">
      
      {!showForm && (
        <div className="d-flex justify-content-center mt-5">
          <h1>Registrado Correctamente!</h1>
        </div> 
      )}
      {showForm && (
        <MDBRow className="d-flex justify-content-center align-items-center h-100">
        <MDBCol>
          <MDBCard className="my-4 registerCard">
            <MDBRow className="g-0">
              <MDBCol md="6" className="d-none d-md-block">
                <MDBCardImage src={registerImage} alt="Clinic Logo" fluid />
              </MDBCol>
      
              <MDBCol md="6">
                <Form
                  onSubmit={handleSubmit}
                  className="registerForm"
                  noValidate
                  validated={validated}
                >
                  <MDBCardBody className="text-black d-flex flex-column justify-content-center">
                    <h3 className="mb-5 text-uppercase fw-bold">Enter your information</h3>
      
                    <MDBRow>
                      <MDBCol md="6">
                        <MDBInput
                          required
                          wrapperClass="mb-4"
                          label="Nombre"
                          size="lg"
                          type="text"
                          onChange={handleChange}
                          name="nombre"
                          value={formValues.nombre}
                        />
                      </MDBCol>
                      <MDBCol md="6">
                        <MDBInput
                          required
                          wrapperClass="mb-4"
                          label="Apellido"
                          size="lg"
                          type="text"
                          onChange={handleChange}
                          name="apellidos"
                          value={formValues.apellidos}
                        />
                      </MDBCol>
                    </MDBRow>
      
                    <MDBInput
                      required
                      wrapperClass="mb-4"
                      label="Correo electrónico"
                      size="lg"
                      type="email"
                      onChange={handleChange}
                      name="email"
                      value={formValues.email}
                    />
                    <MDBInput
                      required
                      wrapperClass="mb-4"
                      label="Teléfono"
                      size="lg"
                      type="text"
                      onChange={handleChange}
                      name="telefono"
                      value={formValues.telefono}
                    />
                    <MDBInput
                      required
                      wrapperClass="mb-4"
                      label="Contraseña"
                      size="lg"
                      type="password"
                      onChange={handleChange}
                      name="password"
                      value={formValues.password}
                    />
      
                    <div className="d-flex flex-column justify-content-center pt-3">
                      {registerError && (
                        <p style={{ color: "red" }}>{registerError}</p>
                      )}
                      <Button
                        className="ms-2"
                        variant="success"
                        size="lg"
                        type="submit"
                      >
                        Sing in
                      </Button>
                    </div>
                  </MDBCardBody>
                </Form>
              </MDBCol>
            </MDBRow>
          </MDBCard>
        </MDBCol>
      </MDBRow>
      
      )}
    </div>
  );
}
