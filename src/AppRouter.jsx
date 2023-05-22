import React from "react";
import {Routes, Route} from "react-router-dom"
import { Admin, Appointments, CreateAppointment, Home, Login, PageNotFound, Register, RegisterDoctor, UserProfile } from "./containers"

export default function AppRouter() {
    return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/create-appointment" element={<CreateAppointment />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register-doctor" element={<RegisterDoctor />} />
        <Route path="*" exact={true} element={<PageNotFound />} />
      </Routes>
    );
  }
