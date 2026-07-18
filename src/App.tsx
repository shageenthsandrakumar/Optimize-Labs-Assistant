import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import DoctorView from "./pages/DoctorView";
import PatientView from "./pages/PatientView";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/doctor" element={<DoctorView />} />
        <Route path="/patient" element={<PatientView />} />
      </Routes>
    </BrowserRouter>
  );
}
