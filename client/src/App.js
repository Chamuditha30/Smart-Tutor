import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import LoginPage from "./pages/commonPages/LoginPage";
import UserContextProvider from "./context/userContext";
import RegisterPage from "./pages/commonPages/RegisterPage";
import AdminVideosPage from "./pages/adminPages/AdminVideosPage";
import AddVideoPage from "./pages/adminPages/AddVideoPage";
import UpdateVideoPage from "./pages/adminPages/UpdateVideoPage";

axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <BrowserRouter>
      <UserContextProvider>
        <Toaster position="bottom-right" toastOption={{ duration: 5000 }} />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/admin/videos" element={<AdminVideosPage />} />
          <Route path="/add/video" element={<AddVideoPage />} />
          <Route path="/update/video/:id" element={<UpdateVideoPage />} />
        </Routes>
      </UserContextProvider>
    </BrowserRouter>
  );
}

export default App;
