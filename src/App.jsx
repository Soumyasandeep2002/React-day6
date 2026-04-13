import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import CallbackPage from "./pages/CallbackPage";
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
  const isAuth = localStorage.getItem("isAuthenticated") === "true";
  return isAuth ? children : <Navigate to="/" replace/>;
};

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/callback" element={<CallbackPage />} />

        {/* ✅ Change parent path from "/" to "" (layout wrapper) */}
        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/qr" element={<QRDetails />} />
          <Route path="/language" element={<Language />} />
          <Route path="/help" element={<Help />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/raise-ticket" element={<RaiseTicket />} />
          <Route path="/view-ticket" element={<ViewTicket />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}