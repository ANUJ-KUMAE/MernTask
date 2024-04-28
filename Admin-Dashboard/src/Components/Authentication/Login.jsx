import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./LoginSignupStyle.css";
import Log from "../../Images/Login.png";
import { toast } from "react-toastify";
import { AuthContextProvider } from "../../Context/AuthContex";

const URL = "http://localhost:5050/Auth/admin/login";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {storeTokenData} = AuthContextProvider();
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email);
    console.log(password);

    try {
      const response_login = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({email, password}),
      });

      const res_auth = await response_login.json();

      if (response_login.ok) {
        toast.success("Login Successful");
        //localStorage.setItem('Token', JSON.stringify(res_auth))
        storeTokenData(res_auth.token)
        navigate("/home");
      } else {
        toast.error(res_auth.extraDetails ? res_auth.message : res_auth.extraDetails);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section>
      <div className="account-container">
        <div className="Left-part">
          <img src={Log} alt="SignUp" />
        </div>
        <div className="right-part-signup">
          <div className="bottom-element">
            <div className="form-header-name">
              <h3>Login Here</h3>
            </div>
            <form className="form-element" onSubmit={handleSubmit}>
              <div className="form-input-types">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  placeholder="Email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="off"
                />
              </div>
              <div className="form-input-types">
                <label htmlFor="password">Password</label>
                <input
                  type="text"
                  placeholder="Password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="off"
                />
              </div>
              <div className="form-button">
                <button className="btn">Submit</button>
              </div>
              <div className="Account-already">
                <p>
                  Don't have an Account{" "}
                  <NavLink to="/signup">
                    <span>Create Account</span>
                  </NavLink>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
