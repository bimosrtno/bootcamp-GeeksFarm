import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// membuat referensi
const el= document.getElementById("root");
// ambil alih aksesn elemen
const root = ReactDOM.createRoot(el);
// tampilkan
root.render(<App/>)