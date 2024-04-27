import Navbar from './Navbar'
import Landing from './Landing'
import Blogs from '../Blog/Blogs';
import Contact from "../Blog Forms/Contact";
import SearchBar from './SearchBar';

const Home = () => {
  return (
    <>
      <Navbar />
      {/* <SearchBar /> */}
      <Landing />
      <Blogs />
      <Contact />
    </>
  )
}

export default Home