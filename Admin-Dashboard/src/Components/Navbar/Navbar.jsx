import React, { useState, useEffect } from "react";
import { FaTimes, FaBars } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";
import Logom from "../../Images/Logom.png";
import { toast } from "react-toastify";
import { AuthContextProvider } from "../../Context/AuthContex";

const Navbar = () => {
  const [click, setClick] = useState(false);
  const auth = localStorage.getItem("Token");
  const { user } = AuthContextProvider();

  const navigate = useNavigate();

  const handleClick = () => {
    setClick(!click);
  };

  const Logout = () => {
    localStorage.clear();
    toast.success("Logout Successfully");
    navigate("/");
  };

  return (
    <div className="Nav-container">
      <div className="Left-Nav">
        <img src={Logom} alt="Logo" />
      </div>
      <div>
        <ul className={click ? "Right-Nav active" : "Right-Nav"}>
          {auth ? (
            <>
              <li>
                <h3 style={{ color: "white" }}>{user.name}</h3>
              </li>
              <li>
                <NavLink to="/home">Home</NavLink>
              </li>
              <li>
                <NavLink to="/employee">EmployeeList</NavLink>
              </li>
              <li>
                <NavLink onClick={Logout} to="/">
                  Logout
                </NavLink>
              </li>
            </>
          ) : (
            <li>
              <NavLink to="/">Login</NavLink>
            </li>
          )}
        </ul>
        <div
          style={{ color: "white", fontSize: "30px" }}
          className="humberg"
          onClick={handleClick}
        >
          {click ? <FaTimes className="cross" /> : <FaBars className="list" />}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
