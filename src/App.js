import React, { useEffect, useState, useReducer } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Signup from './components/SignUp/Signup';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./components/SignUp/Login";
import Dashboard from "./components/Dashboard/Dashboard";

function App() {
  return (
    <div className="App">
       <ToastContainer
          position="top-right"
          autoClose={800}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          limit={1}
        />

   <Routes>
    <Route exact path="/" element={<Signup />} />
    <Route exact path="/login" element={<Login />} />
    <Route exact path="/dashboard" element={<Dashboard />} />
    </Routes>     
   
    </div>
  );
}

export default App;
