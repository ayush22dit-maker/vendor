import React from 'react';
import { Routes, Route } from "react-router-dom";
import Register from './pages/auth/Register';
import Login from "./pages/auth/Login";
import ForgotPassword from './pages/auth/ForgotPassword';

const App = () => {
    return (
        <Routes>
            <Route path="/"  element={<Register/>}/>
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

        </Routes>
    )
}

export default App;


