import React, { useEffect, useRef, useState } from "react";
import LandingPage from "./component/route/LandingPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminPage from "./component/route/Admin";
import LoginPage from "./component/route/Login";
import ChangePassword from "./component/route/ChangePassword";
const App = () => {
  return (
    <BrowserRouter >
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route exact path="/admin" element={<AdminPage />} />
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/password" element={<ChangePassword />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
