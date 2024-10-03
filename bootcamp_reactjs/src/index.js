import React from "react";
import ReactDOM from "react-dom/client";

import Hello from "./coba2";

// membuat referensi
const el= document.getElementById("root");

// ambil alih aksesn elemen
const root = ReactDOM.createRoot(el);

// komponen
//function App() {
    //return <h1>halo halo</h1>;
//}

// tampilkan
root.render(<Hello/>)