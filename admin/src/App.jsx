import React from "react";
import { Routes, Route } from "react-router-dom";

import Login from "./pages/auth/Login";
import ForgotPassword from "./pages/auth/ForgotPassword";
import Dashboard from "./dashboard/Dashboard";
import AdminLayout from "./layouts/AdminLayout";

import ProtecteRoute from "./components/ProtectRoute";
import CategoryList from "../src/categories/CategoryList";
import CategoryForm from "./categories/CategoryForm";

const App = () => {
    return (
        <Routes>


            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

            <Route
                element={<ProtecteRoute> <AdminLayout />  </ProtecteRoute>} >
                <Route path="/dashboard"  element={<Dashboard />}
                />
            </Route>

            <Route path='/categories' element={<CategoryList />}/>
            <Route path="/categories/add" element={<CategoryForm />} />
            <Route path="/categories/edit/:id" element={<CategoryForm />} />
        </Routes>
    );
};

export default App;