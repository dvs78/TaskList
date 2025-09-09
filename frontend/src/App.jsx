import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";

axios.defaults.baseURL =
  import.meta.env.MODE === "development"
    ? "http://localhost:3000/api"
    : "https://tasklist-o2yv.onrender.com/api";
// axios.defaults.baseURL = "https://tasklist-o2yv.onrender.com/api";

function App() {
  return (
    <div className="app_components">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
