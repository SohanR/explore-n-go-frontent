import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const DropDownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.setItem("auth", false);
    console.log(localStorage.getItem("auth"));
    navigate("/");
    window.location.reload();
  };

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        onClick={toggleDropdown}
        className="inline-flex justify-center items-center p-2  rounded-md "
      >
        <span className="text-white"></span>
      </button>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            <p className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-300">
            Username
            </p>
            <p className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-300">
              <Link to="/myBookings">My Bookings</Link>
            </p>
            <p className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-300">
              <button onClick={handleLogOut}>LogOut</button>
            </p>
          </div>
        </div>
      )}        
    </div>
  );
};

export default DropDownMenu;
