import React, { useState } from "react";
import "../../Style/AdminStyle.css";
import { toast } from "react-toastify";
import { json, useNavigate } from "react-router-dom";
import Admin from "../../Images/Admin.jpg";
import axios from "axios";

const CreateNew = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [designation, setDesignation] = useState("");
  const [gender, setGender] = useState("");
  const [courses, setCourses] = useState([]);
  //const [avatar, setAvatar] = useState([]);
  //const [imagePreview, setImagePreview] = useState([]);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(name, email, mobile, designation, gender, courses);

    try {
      const response = await fetch(
        "http://localhost:5050/Auth/employee/addEmployee",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            mobile,
            designation,
            gender,
            courses: courses.map((course) => ({ course })),
          }),
        }
      );

      const res_auth = await response.json();
      console.log("res from server", res_auth.extraDetails);
      if (response.ok) {
        toast.success("Employee Added Successfully");
        navigate("/employee");
      } else {
        toast.error(
          res_auth.extraDetails ? res_auth.message : res_auth.extraDetails
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  {
    /* const onUpload = (e) => {
    const file = e.target.files[0];
    console.log(file);
    TransformFile(file);
  };

  const TransformFile = (file) => {
    const reader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
    } else {
      setAvatar("");
    }
  };*/
  }

  const handleCheckboxChange = (e) => {
    const value = e.target.value;
    if (courses.includes(value)) {
      setCourses(courses.filter((course) => course !== value));
    } else {
      setCourses([...courses, value]);
    }
  };

  return (
    <section>
      <div className="update-container">
        <div className="update-list">
          <div className="update-list-name">
            <h2>Add New Employee</h2>
          </div>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="input-fill-text">
              <label htmlFor="name">Name: </label>
              <input
                type="text"
                placeholder="Name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="input-fill-text">
              <label htmlFor="email">Email: </label>
              <input
                type="text"
                placeholder="Email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-fill-text">
              <label htmlFor="mobile">Mobile: </label>
              <input
                type="number"
                placeholder="Number"
                name="phone"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
            </div>
            <div className="designation-type">
              <label htmlFor="cars">Designation: </label>
              <select
                name="designation"
                id="designation"
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
              >
                <option value="HR">HR</option>
                <option value="Manager">Manager</option>
                <option value="Sales">Sales</option>
              </select>
            </div>
            <div className="gender-radio">
              <label htmlFor="gender">Gender: </label>
              <div className="lable-gender">
                <div className="gender-lists">
                  <input
                    type="radio"
                    id="male"
                    name="gender"
                    value="male"
                    checked={gender === "male"}
                    onChange={(e) => setGender(e.target.value)}
                  />
                  <label htmlFor="Male">Male</label>
                </div>
                <div className="gender-lists">
                  <input
                    type="radio"
                    id="female"
                    name="gender"
                    value="female"
                    checked={gender === "female"}
                    onChange={(e) => setGender(e.target.value)}
                  />
                  <label htmlFor="Female">Female</label>
                </div>
              </div>
            </div>

            <div className="course-checkbox">
              <label>Courses: </label>
              <div className="course-lists">
                <div>
                  <input
                    type="checkbox"
                    id="mca"
                    name="courses"
                    value="MCA"
                    checked={courses.includes("MCA")}
                    onChange={handleCheckboxChange}
                  />
                  <label htmlFor="mca">MCA</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="bca"
                    name="courses"
                    value="BCA"
                    checked={courses.includes("BCA")}
                    onChange={handleCheckboxChange}
                  />
                  <label htmlFor="bca">BCA</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="bsc"
                    name="courses"
                    value="BSC"
                    checked={courses.includes("BSC")}
                    onChange={handleCheckboxChange}
                  />
                  <label htmlFor="bsc">BSC</label>
                </div>
              </div>
            </div>

            <div className="custom-file">
              <input
                type="file"
                accept="image/*"
                name="avatar"
              />
              <label htmlFor="customfile">Choose File</label>
            </div>

            <button className="btn updatebtn">Update</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CreateNew;
