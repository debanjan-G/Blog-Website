
import { Link } from 'react-router-dom';
import Button from '../Utils/Button';

const Navbar = () => {
  let profileRoute = "/login"
  if (localStorage.getItem("jwt")) {
    profileRoute = "/profile"
  }

  const handleAnchorTagClick = (e, id) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (target) {
      window.scrollTo({
        top: target.offsetTop,
        behavior: 'smooth' // Smooth scrolling behavior
      });
    }
  };

  return (
    <div className='flex justify-between items-center p-4'>

      <div className="links flex gap-10 font-semibold">
        <h1 className='advent-pro-medium text-red-600 text-3xl shadow-lg'>TheBlogger</h1>
      </div>

      <div className='flex gap-10 font-semibold items-center'>
        <Link to="/" className='hover:text-green-700 text-lg' onClick={(e) => handleAnchorTagClick(e, 'home')}>Home</Link>
        <Link to="/blogs" className='hover:text-green-700 text-lg' onClick={(e) => handleAnchorTagClick(e, 'blogs')}>Blogs</Link>
        <Link to="/contact" className='hover:text-green-700 text-lg' onClick={(e) => handleAnchorTagClick(e, 'contact')}>Contact</Link>
        <Link to={profileRoute} className='hover:text-green-700 text-lg'>Profile</Link>
        <Link to="/login">
          <Button >Log In</Button>
        </Link>
      </div>

    </div>


  );
};

export default Navbar;
