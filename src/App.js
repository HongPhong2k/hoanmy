import React, { useEffect, useRef, useState } from "react";
import LandingPage from "./component/route/LandingPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminPage from "./component/route/Admin";
import LoginPage from "./component/route/Login";
const App = () => {
  return (
    <BrowserRouter basename="/buildPage">
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route exact path="/admin" element={<AdminPage />} />
        <Route exact path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
