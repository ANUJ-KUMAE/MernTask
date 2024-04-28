import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Sign from "../../Images/SignUp.png";
import "./LoginSignupStyle.css";
import { AuthContextProvider } from "../../Context/AuthContex";
import { toast } from "react-toastify";



const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const {storeTokenData} = AuthContextProvider();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(name, email, phone, password);
    try {
      const response = await fetch(`http://localhost:5050/Auth/admin/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({name, email, phone, password}),
      });

      const res_auth = await response.json();
      console.log("res from server", res_auth.extraDetails);

      if (response.ok) {
        //localStorage.setItem('token', res_auth);
        storeTokenData(res_auth.token)
        setName('');
        setEmail('');
        setPhone('');
        setPassword('');
        toast.success("Register Successful");
        navigate("/home");
      } else {
        toast.error(
          res_auth.extraDetails ? res_auth.message : res_auth.extraDetails
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section>
      <div className="account-container">
        <div className="Left-part">
          <img src={Sign} alt="SignUp" />
        </div>
        <div className="right-part-signup">
          <div className="bottom-element">
            <div className="form-header-name">
              <h3>Create Account</h3>
            </div>
            <form className="form-element" onSubmit={handleSubmit}>
              <div className="form-input-types">
                <label htmlFor="name">Your Name</label>
                <input
                  type="text"
                  placeholder="Enter Name"
                  id="userName"
                  name="userName"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="off"
                  required
                />
              </div>
              <div className="form-input-types">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  placeholder="Email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="off"
                  required
                />
              </div>
              <div className="form-input-types">
                <label htmlFor="phone">Mobile Number</label>
                <input
                  type="number"
                  placeholder="Mobile Number"
                  id="phone"
                  name="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  autoComplete="off"
                  required
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
                  autoComplete="off"
                  required
                />
              </div>
              <div className="term-condition">
                <input type="checkbox" required />
                <p>Accept All Terms And Conditions</p>
              </div>
              <div className="form-button">
                <button className="btn">Submit</button>
              </div>
              <div className="Account-already">
                <p>
                  Already have an Account{" "}
                  <NavLink to="/">
                    <span>Login</span>
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

export default Signup;
