import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import LoginPage from "./pages/commonPages/LoginPage";
import UserContextProvider from "./context/userContext";
import RegisterPage from "./pages/commonPages/RegisterPage";
import AdminVideosPage from "./pages/adminPages/AdminVideosPage";
import AddVideoPage from "./pages/adminPages/AddVideoPage";
import UpdateVideoPage from "./pages/adminPages/UpdateVideoPage";
import AdminStudentPage from "./pages/adminPages/AdminStudentPage";
import StudentVideosPage from "./pages/studentPages/StudentVideosPage";
import ProtectedRoutes from "./protectedRoutes/ProtectedRoutes";

axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <BrowserRouter>
      <UserContextProvider>
        <Toaster position="top-center" toastOption={{ duration: 5000 }} />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/admin/videos"
            element={
              <ProtectedRoutes role={["admin"]}>
                <AdminVideosPage />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/admin/video/add"
            element={
              <ProtectedRoutes role={["admin"]}>
                <AddVideoPage />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/admin/video/update/:id"
            element={
              <ProtectedRoutes role={["admin"]}>
                <UpdateVideoPage />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/admin/students"
            element={
              <ProtectedRoutes role={["admin"]}>
                <AdminStudentPage />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/student/videos"
            element={
              <ProtectedRoutes role={["student"]}>
                <StudentVideosPage />
              </ProtectedRoutes>
            }
          />
        </Routes>
      </UserContextProvider>
    </BrowserRouter>
  );
}

export default App;
