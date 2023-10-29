import React, { useEffect, useState } from "react";
import { useMatch, useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  let navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");
  const match = useMatch("/login");

  useEffect(() => {
    if (accessToken) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
      if (!match) {
        navigate("/login");
      }
    }
  }, [accessToken, navigate, match]);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  return (
    <nav className="bg-blue-500 p-4 sticky top-0 z-10">
      <div className="container mx-auto flex justify-between items-center">
        <a href="/" className="text-2xl font-bold text-white">
          ECOM
        </a>

        <div>
          {isLoggedIn ? (
            <div className="flex items-center space-x-4">
              <a href="/create-product" className="text-white">
                Create product
              </a>
              <button
                onClick={handleLogout}
                className="text-white cursor-pointer"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <a href="/login" className="text-white">
                Login
              </a>
              <a href="/register" className="text-white">
                Register
              </a>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
