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
import ContactForm from "./components/ContactForm";
import BlogArticle from "./components/BlogArticle";
import Profile from "./components/Profile";
import ScrollToTop from "./components/ScrollToTop";
import CreateBlogForm from "./components/CreateBlogForm";
import DeleteSuccessful from "./components/DeleteSuccessful";
import EditBlogForm from "./components/EditBlogForm";
import SuccessfulBlogEdit from "./components/SuccessfulBlogEdit";

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
          <Route path="/profile"  >
            <Route path="" element={<Profile />} />
            <Route path="deleted" element={<DeleteSuccessful />} />
            <Route path="edit" element={<EditBlogForm />} />
            <Route path="edited" element={<SuccessfulBlogEdit />} />
          </Route>
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
