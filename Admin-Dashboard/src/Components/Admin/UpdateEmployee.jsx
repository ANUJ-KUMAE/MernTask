import React, { useState, useEffect } from "react";
import "../../Style/AdminStyle.css";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const UpdateEmployee = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [designation, setDesignation] = useState("");
  const [gender, setGender] = useState("");
  const [courses, setCourses] = useState([]);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getEmployeeDetails();
  }, []);

  const getEmployeeDetails = async () => {
    let result = await fetch(
      `http://localhost:5050/Auth/employee/getSingleEmployee/${params.id}`,
      {
        method: "GET",
      }
    );
    result = await result.json();
    setName(result.name);
    setEmail(result.email);
    setMobile(result.mobile);
    setDesignation(result.designation);
    setGender(result.gender);
    setCourses(result.courses.map(course => course.course));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(name, email, mobile, designation, gender, courses);

    try {
      let result = await fetch(
        `http://localhost:5050/Auth/employee/updateEmployeeData/${params.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            mobile,
            designation,
            gender,
            courses : courses.map((course) => ({ course })),
          }),
        }
      );
      result = await result.json();
      console.warn(result);
      toast.success("Updated Successfully");
      navigate("/employee");
    } catch (error) {
      console.log(error);
    }
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setCourses((prevCourses) => [...prevCourses, value]); 
    } else {
      setCourses((prevCourses) =>
        prevCourses.filter((course) => course !== value)
      ); 
    }
  };

  return (
    <section>
      <div className="update-container">
        <div className="update-list">
          <div className="update-list-name">
            <h2>Update Data</h2>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="input-fill-text">
              <label htmlFor="name">Name: </label>
              <input
                type="text"
                placeholder="Name"
                name="userName"
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
                    //onChange={(e) => setCourse(e.target.value)}
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
                    //onChange={(e) => setCourse(e.target.value)}
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
                    //onChange={(e) => setCourse(e.target.value)}
                    onChange={handleCheckboxChange}
                  />
                  <label htmlFor="bsc">BSC</label>
                </div>
              </div>
            </div>
            <button className="btn updatebtn">
              Update
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default UpdateEmployee;
