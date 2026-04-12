import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import MainLayout from "./layout/MainLayout";

import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import QRDetails from "./pages/QRDetails";
import Language from "./pages/Language";
import Help from "./pages/Help";
import Profile from "./pages/Profile";
import RaiseTicket from "./pages/RaiseTicket";
import ViewTicket from "./pages/ViewTicket";

const ProtectedRoute = ({ children }) => {
  const isAuth = localStorage.getItem("isAuthenticated");
  return isAuth ? children : <Navigate to="/" />;
};

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="qr" element={<QRDetails />} />
          <Route path="language" element={<Language />} />
          <Route path="help" element={<Help />} />
          <Route path="profile" element={<Profile />} />
          <Route path="/raise-ticket" element={<RaiseTicket />} />
        <Route path="/view-ticket" element={<ViewTicket />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}