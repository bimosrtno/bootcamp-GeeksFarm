import React from "react";
import ReactDOM from "react-dom";

const navbarStyle = {
  
    backgroundColor: "black", // Warna latar belakang navbar
    padding: "10px 20px", // Jarak di dalam navbar
    position: "fixed", // Membuat navbar tetap di atas saat scroll
    top: "0", // Menempatkan navbar di bagian atas
    left: "0", // Menempatkan navbar di sisi kiri
    right: "0", // Menempatkan navbar di sisi kanan
    zIndex: 1000, // Menempatkan navbar di atas konten lainnya
  };
  

const linkStyle = {
color: "white", /* Warna teks link */
textDecoration: "none", /* Menghilangkan garis bawah pada link */
margin: "0 15px", /* Jarak antar link */
fontWeight: "bold", /* Membuat teks lebih tebal */
};

const contentStyle = {
  marginTop: "60px", // Jarak navbar dan konten
};


const element = 
<div>
  <nav style={navbarStyle}>
<a href="/"  style={linkStyle}>home </a>
<a href="/about" style={linkStyle}>about </a>
<a href="/contact" style={linkStyle}>contact</a>  
</nav> 
<h1 style={contentStyle}>halo ini react</h1>
</div>;
ReactDOM.render(element, document.getElementById("root"));   


//const element = <hi> halo ini react </hi>;
//ReactDOM.render(element, document.getElementById("root"));