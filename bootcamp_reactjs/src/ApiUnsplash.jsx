import React, { useState } from "react"; 
import axios from "axios"; // impor axios

const ImageSearch = () => {
  const [query, setQuery] = useState(""); // Menyimpan input pencarian dari user
  const [images, setImages] = useState([]); // Menyimpan hasil pencarian gambar

  // API Key dari Unsplash
  const ACCESS_KEY = "bniy07TCzKw7wq3IipIsuz36k6owxquaVfr2MykYc7E"; 

  // Fungsi untuk pencarian gambar
  const searchImages = async (e) => {
    e.preventDefault(); // Mencegah reload halaman saat form disubmit
    try {
      const { data } = await axios.get( // get data dari API Unsplash
        `https://api.unsplash.com/search/photos?query=${query}&client_id=${ACCESS_KEY}`
      );
      setImages(data.results); // Menyimpan hasil gambar di state
    } catch (error) {
      console.error("Error fetching images:", error); // error jika request gagal
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Cari Gambar</h1>

      {/* Form untuk input pencarian */}
      <form onSubmit={searchImages}>
        <input
          type="text"
          placeholder="cari gambar"
          value={query}
          onChange={(e) => setQuery(e.target.value)} // Mengatur query dari input
          style={{ padding: "10px", width: "300px" }}
        />
        <button type="submit" style={{ padding: "10px 20px", marginLeft: "10px" }}>
          Cari
        </button>
      </form>

      {/* Menampilkan hasil gambar */}
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", marginTop: "20px" }}>
        {images.map(({ id, urls, alt_description }) => ( // render gambar dari hasil pencarian
          <div key={id} style={{ margin: "10px" }}>
            <img
              src={urls.small} 
              alt={alt_description} 
              style={{ width: "300px", height: "200px", objectFit: "cover" }} 
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageSearch; 




