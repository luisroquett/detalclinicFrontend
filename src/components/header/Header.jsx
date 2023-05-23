import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Header.scss";
import { useSelector } from "react-redux";
import { updateAuthStoreStateLogOut } from "../../features/authentication/updateAuthState";
import {
  MdPersonOutline,
  MdOutlineLogout,
  MdOutlineLogin,
} from "react-icons/md";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import navLogo from "../../assets/dentalLogo.png";
import "./Header.scss";
export default function Header() {
  // hooks
  const navigate = useNavigate();
  const authState = useSelector((state) => state.auth);
  const isLoggedIn = authState.isLoggedIn;
  const { name, role } = authState.userInfo;
  const isAdmin = role == "admin";
  const isDoctor = role == "doctor";

  // handlers
  const handleLogout = () => {
    updateAuthStoreStateLogOut();
    navigate("/");
  };

  return (
    <div className="Header">
      <Navbar
        className="bg-gradient"
        collapseOnSelect
        expand="lg"
        bg="dark"
        variant="dark"
      >
        <Container>
          <Navbar.Brand href="/">
            <img
              src={navLogo}
              width="50"
              height="50"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              {!isAdmin && isLoggedIn && (
                <>
                  <NavLink className="nav-link" to="/appointments">
                    Appointments
                  </NavLink>
                </>
              )}
              {!isAdmin && !isDoctor && isLoggedIn && (
                <NavLink className="nav-link" to="/create-appointment">
                  Create appointment
                </NavLink>
              )}
              {isAdmin && (
                <>
                  <NavLink className="nav-link" to="/admin">
                    Admin
                  </NavLink>
                  <NavLink className="nav-link" to="/register-doctor">
                    Register doctor
                  </NavLink>
                </>
              )}
            </Nav>
            {!isLoggedIn && (
              <Nav>
                <NavLink className="nav-link" to="/login">
                  <MdOutlineLogin /> Login
                </NavLink>
                <NavLink className="nav-link" to="/register">
                  Sign in
                </NavLink>
              </Nav>
            )}
            {isLoggedIn && (
              <Nav>
                <NavDropdown
                  title={name}
                  id="collasible-nav-dropdown"
                  align="end"
                >
                  <NavDropdown.Item href="/profile">
                    <MdPersonOutline /> Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={handleLogout}>
                    <MdOutlineLogout /> Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
    //  <div className="Header">
    //       <nav className="navbar">
    //          <ul className="navbar-nav">
    //             <li className="nav-item">
    //                <NavLink to="/">Home</NavLink>
    //             </li>

    //             <li className="nav-item">
    //                <NavLink to="/appointments">Appointments</NavLink>
    //             </li>
    //             <li className="nav-item">
    //                <NavLink to="/about">About</NavLink>
    //             </li>

    //             {isAdmin && (
    //                <>
    //                   <li className="nav-item">
    //                      <NavLink to="/admin">Admin</NavLink>
    //                   </li>
    //                </>
    //             )}
    //          </ul>

    //          <ul className="navbar-nav">
    //             {!isLoggedIn && (
    //                <>
    //                   <li className="nav-item">
    //                      <NavLink to="/login">
    //                         <MdOutlineLogin />
    //                         Login
    //                      </NavLink>
    //                   </li>
    //                   <li className="nav-item">
    //                      <NavLink to="/register">Register</NavLink>
    //                   </li>
    //                </>
    //             )}

    //             {isLoggedIn && (
    //                <>
    //                   <li className="nav-item dropdown ">
    //                      <a>
    //                         <MdPersonOutline className="icon" /> {name}{" "}

    //                      </a>

    //                      <ul className="dropdown-menu">
    //                         <li className="dropdown-item">
    //                            <NavLink to="/profile">Profile</NavLink>
    //                         </li>
    //                         <li className="dropdown-item">
    //                            <a onClick={handleLogout}>
    //                               <MdOutlineLogout />
    //                               Logout
    //                            </a>
    //                         </li>
    //                      </ul>
    //                   </li>
    //                </>
    //             )}
    //          </ul>
    //       </nav>
    //    </div>
  );
}
