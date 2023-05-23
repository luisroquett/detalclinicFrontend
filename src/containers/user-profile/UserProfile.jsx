import React, { useEffect, useState } from "react";
import userService from "../../_services/userService";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useSelector } from "react-redux";
import { setUserInfo } from "../../features/authentication/authSlice";
import { store } from "../../app/store";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBTypography,
  MDBIcon,
} from "mdb-react-ui-kit";
import validator from "validator";
import "./UserProfile.scss";


export default function UserProfile() {
  // HOOKS
  const [profile, setProfile] = useState({});
  const [formValues, setFormValues] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [updateError, setUpdateError] = useState(null);
  const [updateEmailError, setUpdateEmailError] = useState(null);
  const [validated, setValidated] = useState(false);

  const authState = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (authState.userToken) {
      getProfile(authState.userToken);
    } else {
      navigate("/");
    }
  }, []);

  // FUNCTIONS
  const getProfile = async (token) => {
    try {
      const response = await userService.getProfile(token);

      setProfile(response);
    } catch (error) {
      console.log(error);
    }
  };

  const updateProfile = async (token, newUserData) => {
    await userService.updateProfile(token, newUserData);
  };

  // HANDLERS
  const handleSubmit = (event) => {
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      if (formValues.password) {
        if (
          !validator.isByteLength(formValues.password, {
            min: 8,
            max: undefined,
          })
        ) {
          event.preventDefault();
        return  setUpdateError("Password must contain at least 8 characters");
        } else if (
          validator.isByteLength(formValues.password, {
            min: 8,
            max: undefined,
          })
        ) {
          setUpdateError(null);
        }
      }

      if (formValues.email) {
        if (!validator.isEmail(formValues.email)) {
          event.preventDefault();
        return  setUpdateEmailError("Introduce un email correcto");
        } else if (validator.isEmail(formValues.email)) {
          setUpdateEmailError(null);
        }
      }

      updateProfile(authState.userToken, formValues);
      if (formValues.nombre) {
        store.dispatch(setUserInfo({ name: formValues.nombre }));
      }
    }
    setValidated(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value, //key: value
    });
  };

  const handleShowForm = () => {
    setShowForm(true);
  };

  const handleHideForm = () => {
    setShowForm(false);
  };

  // RETURN
  return (
    <div className="container Userprofile">
      <section>
      <MDBContainer className="py-5">
      <MDBRow className="justify-content-center">
        <MDBCol lg="6" className="mb-4">
          <MDBCard className="profile-card">
            <MDBCardBody>
              <MDBRow className="align-items-center">
                <MDBCol md="4" className="text-center profile-info">
                  <h3 className="profile-name">
                    {profile.nombre} {profile.apellidos}
                  </h3>
                  <p className="profile-role">{authState.userInfo.role.toUpperCase()}</p>
                  <MDBIcon far icon="edit" className="edit-icon" />
                </MDBCol>
                <MDBCol md="8">
                  <MDBCardBody>
                    <h5 className="section-title">Information</h5>
                    <hr className="section-divider" />
                    <div className="profile-info">
                      <h6 className="info-label">Email</h6>
                      <p className="info-value">{profile.email}</p>
                    </div>
                    <div className="profile-info">
                      <h6 className="info-label">Phone</h6>
                      <p className="info-value">{profile.telefono}</p>
                    </div>
                  </MDBCardBody>
                </MDBCol>
              </MDBRow>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
        {!showForm && (
          <div className="showButtonContainer">
            <Button variant="danger" onClick={handleShowForm}>
              Update Profile
            </Button>
          </div>
        )}

        {showForm && (
          <div className="showButtonContainer">
            <Button variant="secondary" onClick={handleHideForm}>
              Don't update profile
            </Button>
          </div>
        )}
      </section>

      {showForm && (
        <section className="formContainer">
          <Form
            className="updateForm"
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
          >
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Update name"
                name="nombre"
                value={formValues.nombre}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Lastname</Form.Label>
              <Form.Control
                type="text"
                placeholder="Update lastname"
                name="apellidos"
                value={formValues.apellidos}
                onChange={handleChange}
              />
              <Form.Text className="text-muted">
                
              </Form.Text>
            </Form.Group>


            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="New email"
                name="email"
                value={formValues.email}
                onChange={handleChange}
              />
              <Form.Text className="text-muted">
                              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                placeholder="New phone"
                name="telefono"
                value={formValues.telefono}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="New password"
                name="password"
                value={formValues.password}
                onChange={handleChange}
              />
              <Form.Text>
              Your password must be at least 8 characters long and must not contain spaces.
              </Form.Text>
            </Form.Group>
            {updateError && <p style={{ color: "red" }}>{updateError}</p>}
            {updateEmailError && (
              <p style={{ color: "red" }}>{updateEmailError}</p>
            )}
            <div className="updateButton">
              <Button variant="primary" type="submit">
                Update
              </Button>
            </div>
          </Form>
        </section>
      )}
    </div>
  );
};
