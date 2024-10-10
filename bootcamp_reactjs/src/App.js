import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Impor yang bener
import Home from "./Home";
import About from "./About";
import Contact from "./Contact";
import Navbar from "./Navbar";
import YouTubeLayout from "./APIYoutube";

function App() {
  return (
    <Router> 
      <Navbar /> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/youtube" element={<YouTubeLayout />} />
      </Routes>
    </Router>
  );
}

export default App;


