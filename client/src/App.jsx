import Landing from "./components/Landing";
import "./App.css";
import Navbar from "./components/Navbar";
import Blogs from "./components/Blogs";
import Blog from "./components/Blog";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import Header from "./components/Header";

function App() {
  return (
    <Router>
      <div className="sarabun-regular">
      {/* <Navbar/> */}
     
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          
        </Routes>
     
        <Footer />
      </div>
    </Router>
  );
}

export default App;
