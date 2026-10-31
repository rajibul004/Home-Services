import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/Login";
import HomePage from "./pages/Home";
import SuperAdminDashboard from "./Dashboard/pages/super-admin/SuperAdminDashboard";
import CustomerDashboard from "./Dashboard/pages/customer/CustomerDashboard";
import TechnicianDashboard from "./Dashboard/pages/technician/TechnicianDashboard";
import SupervisorDashboard from "./Dashboard/pages/supervisor/SupervisorDashboard";
import SupportDashboard from "./Dashboard/pages/support/SupportDashboard";
import OperationsDashboard from "./Dashboard/pages/operations/OperationsDashboard";
import AdminDashboard from "./Dashboard/pages/admin/AdminDashboard";
import SignupPage from "./pages/Signup";
import GoBack from "./components/GoBack";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route
          path="*"
          element={
            <GoBack
              title="Page Not Found"
              description="Sorry, this page doesn't exist."
              fallbackPath="/login"
            />
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/dashboard/customer/*" element={<CustomerDashboard />} />
        <Route path="/dashboard/user/*" element={<TechnicianDashboard />} />
        <Route
          path="/dashboard/supervisor/*"
          element={<SupervisorDashboard />}
        />
        <Route path="/dashboard/support/*" element={<SupportDashboard />} />
        <Route
          path="/dashboard/operations/*"
          element={<OperationsDashboard />}
        />
        <Route path="/dashboard/admin/*" element={<AdminDashboard />} />
        <Route
          path="/dashboard/super-admin/*"
          element={<SuperAdminDashboard />}
        />

        {/* <Route path="/signup" element={<SignupPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
