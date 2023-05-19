import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import authService from "../../_services/authService";
import Form from "react-bootstrap/Form";
import validator from "validator";

export default function Register() {
  // HOOKS
  const [formValues, setFormValues] = useState({});
  const [showForm, setShowForm] = useState(true);
  const [validated, setValidated] = useState(false);
  const [registerError, setRegisterError] = useState(null);

  // FUNCTIONS

  const registerUser = async (credentials) => {
    await authService.register(credentials);
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
    <div className="perfil-formulario">
      <div className="formulario">
        <h1>Sing in</h1>
        <Form onSubmit={handleSubmit} className="padreBtn">
        <pre style={{ textAlign: "left", width: "250px", margin: "auto" }}>
            {JSON.stringify(formValues, null, 2)}
         </pre>
          <Form.Group className="mb-3  rounded p-4 inputForm">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Fulanito "
              name="name"
              value={formValues.nombre}
              onChange={handleChange}
            />
            <Form.Label>Lastname</Form.Label>
            <Form.Control
              type="text"
              placeholder="DeTal "
              name="apellidos"
              value={formValues.apellidos}
              onChange={handleChange}
            />
         
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Email "
              name="email"
              value={formValues.email}
              onChange={handleChange}
            />
            <Form.Label>Telefono</Form.Label>
            <Form.Control
              type="text"
              placeholder="Teléfono "
              name="telefono"
              value={formValues.telefono}
              onChange={handleChange}
            />
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              value={formValues.password}
              onChange={handleChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="buttonUpdate">
          Create profile
          </Button>
        </Form>
      </div>
    </div>
  );
}