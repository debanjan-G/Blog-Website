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
import ContactForm from "./components/ContactForm";
import BlogArticle from "./components/BlogArticle";
import Profile from "./components/Profile";
import ScrollToTop from "./components/ScrollToTop";
import CreateBlogForm from "./components/CreateBlogForm";
import LazyLoad from "react-lazyload";

function App() {



  return (
    <Router>
      <  ScrollToTop />
      <div className="titillium-web-regular">
        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/contact-form" element={<ContactForm />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-blog" element={<CreateBlogForm />} />
          <Route path="/blog">
            <Route path=":id" element={<BlogArticle />} />
          </Route>
        </Routes>
        <Footer />

      </div>
    </Router>
  );
}

export default App;
