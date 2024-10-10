import React, { useState, useEffect } from "react";
import axios from "axios";

// API Key YOUTUBE  
const API_KEY = "AIzaSyAoJgSS07LbT8FSZAzXrS3rjsr6ZzvyasM"; // API key

// Komponen SearchBar: bagian untuk input pencarian video
const SearchBar = ({ query, onSearchChange, onSearchSubmit }) => (
  <form onSubmit={onSearchSubmit} style={{ marginBottom: "20px" }}>
    <input
      type="text"
      value={query}
      onChange={onSearchChange} // Fungsi untuk memperbarui state 
      placeholder="Cari video"
      style={{ padding: "10px", width: "300px" }}
    />
    <button type="submit" style={{ padding: "10px 20px", marginLeft: "10px" }}>
      Cari
    </button>
  </form>
);

// VideoPlayer
const VideoPlayer = ({ videoId }) => (
  <iframe
    width="100%"
    height="500"
    src={`https://www.youtube.com/embed/${videoId}`} // URL embed YouTube video
    title="YouTube video player"
    frameBorder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
  />
);

// SuggestedVideos
const SuggestedVideos = ({ videos, onVideoSelect }) => (
  <div style={{ width: "280px", paddingLeft: "20px", maxHeight: "550px", overflowY: "auto" }}>
    <h3>Suggest Videos</h3>
    {videos.slice(0, 4).map((video) => ( // Ambil 4 video disarankan
      <div
        key={video.id.videoId}
        style={{ marginBottom: "10px", cursor: "pointer" }}
        onClick={() => onVideoSelect(video.id.videoId)} // Play video yang dipilih
      >
        <img src={video.snippet.thumbnails.default.url} alt={video.snippet.title} style={{ width: "100%" }} />
        <h4 style={{ fontSize: "14px", margin: "5px 0" }}>{video.snippet.title}</h4>
      </div>
    ))}
  </div>
);

// YouTubeLayout
const YouTubeLayout = () => {
  const [query, setQuery] = useState(""); // State untuk menyimpan input pencarian
  const [videoId, setVideoId] = useState("M7lc1UVf-VE"); // Video yang akan ditampilkan pertama kali (dari sananya)
  const [suggestedVideos, setSuggestedVideos] = useState([]); // State untuk video yang disarankan

  // Fungsi untuk mengambil data video dari API YouTube
  const fetchVideos = async (url) => {
    try {
      const response = await axios.get(url);
      setSuggestedVideos(response.data.items); // Update daftar video yang disarankan
      setVideoId(response.data.items[0]?.id.videoId || videoId); // Set videoId dari hasil pencarian pertama
    } catch (error) {
      console.error("Error mengambil video:", error);
    }
  };

  // useEffect untuk mengambil video yang terkait setiap kali videoId berubah
  useEffect(() => {
    fetchVideos(`https://www.googleapis.com/youtube/v3/search?relatedToVideoId=${videoId}&type=video&part=snippet&key=${API_KEY}`);
  }, [videoId]);

  // Submit form pencarian
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return alert("Masukkan kata kunci pencarian."); // Cek jika input kosong
    fetchVideos(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=video&key=${API_KEY}`);
  };

  return (
    <div style={{ display: "flex", padding: "20px" }}>
      <div style={{ flex: 1 }}>
        {/* SearchBar untuk input pencarian */}
        <SearchBar
          query={query}
          onSearchChange={(e) => setQuery(e.target.value)} // Update state query saat pengguna mengetik
          onSearchSubmit={handleSearchSubmit} // Proses pencarian saat form dikirim
        />
        {/* VideoPlayer untuk menampilkan video utama */}
        <VideoPlayer videoId={videoId} />
      </div>
      {/* SuggestedVideos untuk menampilkan daftar video yang disarankan */}
      <SuggestedVideos videos={suggestedVideos} onVideoSelect={setVideoId} />
    </div>
  );
};

export default YouTubeLayout;

