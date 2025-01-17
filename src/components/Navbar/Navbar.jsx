import React, { useContext, useEffect } from "react";
import style from "./Navbar.module.css";
import logo from "./../../assets/images/freshcart-logo.svg";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
export default function Navbar() {
  const { isLogin, setUserToken, setIsLogin } = useContext(UserContext);
  const navigate = useNavigate();
  function handleLogout() {
    localStorage.removeItem("UserToken");
    setIsLogin(false);
    setUserToken(null);
    navigate("/login");
  }
  return (
    <>
      <nav className="bg-slate-300 fixed top-0 left-0 right-0 border-gray-200 z-50">
        <div className="container flex flex-wrap justify-center lg:justify-between gap-4 items-center mx-auto max-w-screen-xl p-4">
          <div className=" left-side flex items-center gap-5">
            <NavLink
              href=""
              className="flex items-center space-x-3 rtl:space-x-reverse"
            >
              <img src={logo} className="h-8" width={120} alt="Logo" />
            </NavLink>
            {/* Show ul items only if the user is logged in */}
            {isLogin && (
              <ul className="links flex gap-4">
                <li>
                  <NavLink className="text-slate-600" to="">
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink className="text-slate-600" to="cart">
                    Cart
                  </NavLink>
                </li>
                <li>
                  <NavLink className="text-slate-600" to="products">
                    Products
                  </NavLink>
                </li>
                <li>
                  <NavLink className="text-slate-600" to="categories">
                    Categories
                  </NavLink>
                </li>
                <li>
                  <NavLink className="text-slate-600" to="brands">
                    Brands
                  </NavLink>
                </li>
              </ul>
            )}
          </div>

          <div className="right-side   flex items-center space-x-6 rtl:space-x-reverse">
            <ul className="social-links flex gap-4">
              <li>
                <i className="fab fa-facebook"></i>
              </li>
              <li>
                <i className="fab fa-instagram"></i>
              </li>
              <li>
                <i className="fab fa-youtube"></i>
              </li>
              <li>
                <i className="fab fa-twitter"></i>
              </li>
            </ul>

            <ul className="sign flex gap-4">
              {/* Show login and register links only if the user is not logged in */}
              {!isLogin ? (
                <>
                  <li>
                    <Link to="login">Login</Link>
                  </li>
                  <li>
                    <Link to="register">Register</Link>
                  </li>
                </>) :<li>
                <span className="cursor-pointer"
                onClick={handleLogout}>Signout</span>
              </li>
              }
              
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
