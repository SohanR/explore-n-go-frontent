  import "./navbar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import {
  faBed,
  faCar,
  faPlane,
  faTaxi,
} from "@fortawesome/free-solid-svg-icons";
import { FaHome } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Navbar = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="navbar">
      <div className="navContainer items-center">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">Go & Explore</span>
        </Link>
        <div className=" flex flex-row justify-start ml-20 mt-3 gap-4 mb-3 items-center">
         
         <Link to='/' className="text-white  flex gap-2 items-center active" >
           <FaHome  />
           <span>Home</span>
         </Link>
         <Link to='/hotels' className="text-white flex gap-2 items-center " >
           <FontAwesomeIcon icon={faPlane} />
           <span>Hotels</span>
         </Link>
         <Link to='/package' className="text-white flex gap-2 items-center">
           <FontAwesomeIcon icon={faCar} />
           <span>Packages</span>
         </Link>
         <Link to='photograph' className="text-white flex gap-2 items-center">
           <FontAwesomeIcon icon={faBed} />
           <span>Photograpers</span>
         </Link>
         <Link to='/taxis' className="text-white flex gap-2 items-center">
           <FontAwesomeIcon icon={faTaxi} />
           <span> taxis</span>
         </Link>
       </div>
        {user ? user.username : (
          <div className="navItems">
            <Link to='/register' className="navButton">Register</Link>
            <button className="navButton">Login</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
