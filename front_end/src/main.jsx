// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import "./style.css";
// import App from "./App.jsx";

// createRoot(document.getElementById("root")).render(
//   <StrictMode>
//     <App />
//   </StrictMode>
// );

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // 👈 importado aqui
import "./style.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      {" "}
      {/* 👈 envolve o App com o roteador */}
      <App />
    </BrowserRouter>
  </StrictMode>
);
