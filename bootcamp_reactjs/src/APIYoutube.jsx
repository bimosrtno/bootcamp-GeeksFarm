import React, { useState, useEffect } from "react";
import axios from "axios";

// Komponen untuk SearchBar
const SearchBar = ({ query, onSearchChange, onSearchSubmit }) => (
  <form onSubmit={onSearchSubmit} style={{ marginBottom: "20px" }}>
    <input
      type="text"
      value={query}  // Nilai input diambil dari state query
      onChange={onSearchChange} // Memanggil fungsi saat ada perubahan pada input
      placeholder="Cari video"
      style={{ padding: "10px", width: "300px" }}
    />
    <button type="submit" style={{ padding: "10px 20px", marginLeft: "10px" }}>
      Cari
    </button>
  </form>
);

// Komponen untuk Video Player
const VideoPlayer = ({ videoId }) => (
  <div style={{ flex: 1 }}>
    <iframe
      width="100%"
      height="500"
      src={`https://www.youtube.com/embed/${videoId}`}
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  </div>
);

// Komponen untuk Suggested Videos
const SuggestedVideos = ({ videos, onVideoSelect }) => ( // kontainer suggested videos
  <div style={{ width: "280px", paddingLeft: "20px", maxHeight: "550px", overflowY: "auto" }}>
    <h3>Suggested Videos</h3>
    {videos.slice(0, 4).map((video) => ( // Ambil 4 video
      <div
        key={video.id.videoId} // key untuk setiap elemen
        style={{ marginBottom: "10px", cursor: "pointer" }} 
        onClick={() => onVideoSelect(video.id.videoId)} // Memanggil onVideoSelect dengan videoId saat elemen diklik
      >
        <img
          src={video.snippet.thumbnails.default.url} //thumbnail video
          alt={video.snippet.title} 
          style={{ width: "100%" }}
        />
        <h4 style={{ fontSize: "14px", margin: "5px 0" }}>{video.snippet.title}</h4>
      </div>
    ))}
  </div>
);

// Komponen utama YouTube Layout
const YouTubeLayout = () => {
  const [query, setQuery] = useState(""); // State untuk menyimpan query pencarian
  const [videoId, setVideoId] = useState("M7lc1UVf-VE"); // Video default
  const [suggestedVideos, setSuggestedVideos] = useState([]);  // State untuk menyimpan suggest video

  useEffect(() => {  // useEffect untuk mengambil video saat videoId berubah
    fetchSuggestedVideos(); // fungsi untuk mengambil video yang disarankan
  }, [videoId]); // Panggil lagi setiap kali videoId berubah

  const fetchSuggestedVideos = async () => {
    const API_KEY = "AIzaSyAoJgSS07LbT8FSZAzXrS3rjsr6ZzvyasM"; // Ganti dengan API key
    try { // Get video yang berkaitan dengan videoId dari API YouTube 
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/search?relatedToVideoId=${videoId}&type=video&part=snippet&key=${API_KEY}`
      );
      setSuggestedVideos(response.data.items);
    } catch (error) {
      console.error("Error fetching suggested videos:", error); 
    }
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    if (!query) {
      alert("Please enter a search term.");
      return;
    }

    const API_KEY = "AIzaSyAoJgSS07LbT8FSZAzXrS3rjsr6ZzvyasM"; // Ganti dengan API key Anda
    try {
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=video&key=${API_KEY}`
      );
      if (response.data.items.length > 0) { // Memeriksa apakah ada hasil yang ditemukan
        setSuggestedVideos(response.data.items); // Update state dengan hasil pencarian
        setVideoId(response.data.items[0].id.videoId);  
      } else { // kalau tidak ditemukan
        alert("No videos found.");
      }
    } catch (error) { // kalau request gagal
      console.error("Error fetching search results:", error);
    }
  };

  return (
    <div style={{ display: "flex", padding: "20px" }}>
      <div style={{ flex: 1 }}>
        <SearchBar query={query} onSearchChange={(e) => setQuery(e.target.value)} onSearchSubmit={handleSearchSubmit} />
        <VideoPlayer videoId={videoId} />
      </div>
      <SuggestedVideos videos={suggestedVideos} onVideoSelect={setVideoId} />
    </div>
  );
};

export default YouTubeLayout;

