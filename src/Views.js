import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Pages/Home";
import LoginPage from "./Components/Pages/LoginPage";
import ProtectedRoutes from "./Components/Routes/ProtectedRoutes";
import TopNavbar from "./Components/Pages/TopNavbar";
import CardDetails from "./Components/Pages/CardDetails";
import BookinPage from "./Components/Pages/BookinPage";
import Cookies from "universal-cookie";
import BookingHistory from "./Components/Pages/BookingHistory";

const Views = () => {
  return (
    <div className="theme_app">
      <TopNavbar />
      <Routes>
        <Route element={<ProtectedRoutes />}>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/cardDetails" element={<CardDetails />}></Route>
          <Route path="/BookinPage" element={<BookinPage />}></Route>
          <Route path="/BookingHistory" element={<BookingHistory />}></Route>

          <Route path="/" element={<LoginPage />}></Route>
        </Route>
      </Routes>
    </div>
  );
};

export default Views;
