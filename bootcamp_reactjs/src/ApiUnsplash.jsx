import React, { useState } from "react";
import axios from "axios"; // Mengimpor axios untuk melakukan request API

const ImageSearch = () => {
  const [query, setQuery] = useState(""); // Menyimpan input pencarian dari user
  const [images, setImages] = useState([]); // Menyimpan hasil pencarian gambar dari API

  // API Key dari Unsplash
  const ACCESS_KEY = "zedlxLoT302EWfRrlBR14GSXQwRUH_-yHqymWKsys04"; 

  // Fungsi untuk melakukan pencarian gambar
  const searchImages = async (e) => {
    e.preventDefault(); // Mencegah reload halaman saat form disubmit
    try {
      const { data } = await axios.get( // GET ke API Unsplash 20 gambar
        `https://api.unsplash.com/search/photos?query=${query}&per_page=20&client_id=${ACCESS_KEY}`
      );
      setImages(data.results); // Menyimpan hasil gambar yang didapatkan ke dalam state
    } catch (error) {
      console.error("Error fetching images:", error); // Jika terjadi error saat request
    }
  };

  return React.createElement(
    'div',
    { style: { textAlign: "center" } }, // Mengatur teks berada di tengah
    React.createElement('h1', null, 'Cari Gambar'), 
    
    // Form untuk input pencarian
    React.createElement(
      'form',
      { onSubmit: searchImages }, 
      React.createElement('input', {
        type: "text", // Input teks untuk mengetikkan kata kunci pencarian
        placeholder: "cari gambar", // Placeholder di dalam input
        value: query, // Mengaitkan input dengan nilai query di state
        onChange: (e) => setQuery(e.target.value), // update nilai query
        style: { padding: "10px", width: "300px" }, // Mengatur padding dan lebar input
      }),
      React.createElement(
        'button',
        { type: "submit", style: { padding: "10px 20px", marginLeft: "10px" } }, // Tombol submit dengan padding
        'Cari' // Teks yang ditampilkan pada tombol
      )
    ),

    // Menampilkan grid gambar hasil pencarian
    React.createElement(
      'div',
      { style: { display: "flex", flexWrap: "wrap", justifyContent: "center", marginTop: "20px" } }, 
      images.map(({ id, urls, alt_description }) =>  // Melakukan mapping gambar 
        React.createElement(
          'div',
          { key: id, style: { margin: "10px" } }, // Mengatur margin antar gambar
          React.createElement('img', {
            src: urls.small, 
            alt: alt_description, 
            style: { width: "250px", height: "300px", objectFit: "cover" } // Mengatur lebar tinggi gambar
          })
        )
      )
    )
  );
};

export default ImageSearch;






