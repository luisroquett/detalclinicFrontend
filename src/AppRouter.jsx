import React from "react";
import {Routes, Route} from "react-router-dom"
import {
    Admin,
    Appointments,
    Home,
    Login,
    Register,
    UserProfile,
    PageNotFound,
    CreateAppointment,
    RegisterDoctor,
} from "./containers"

export default function AppRouter(){
    return(
<Routes>
    <Route> path="/" element={<Home/>}</Route>
    <Route> path="/"</Route>
    <Route> path="/"</Route>
    <Route> path="/"</Route>
    <Route> path="/"</Route>
    <Route> path="/"</Route>
    <Route> path="/"</Route>
    <Route> path="/"</Route>
    <Route> path="*"</Route>
</Routes>
    );
}
