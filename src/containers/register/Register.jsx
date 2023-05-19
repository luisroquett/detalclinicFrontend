import React from "react";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import authService from "../../_services/authService";
import Button from "react-bootstrap/Button";



export default function Register() {
  const [formValues, setFormValues] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value, // key: value
    });
  };
  const handleSubmit = () => {
    registerUser(formValues);
  };
  const registerUser = async (body) => {
    const response = await authService.registerUser(body);
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
            Crear perfil
          </Button>
        </Form>
      </div>
    </div>
  );
}