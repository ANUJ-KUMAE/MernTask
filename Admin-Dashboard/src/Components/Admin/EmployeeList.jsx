import React, { useState, useEffect } from "react";
import "../../Style/AdminStyle.css";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const EmployeeList = () => {
  const [employeeDatas, setEmployeeDatas] = useState([]);
  const [AllEmployeeData, SetAllEmployeeData] = useState([]);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    AllEmployee();
    EmployeeData();
  }, [currentPage]);

  useEffect(() => {
    const totalPagesCount = Math.ceil(AllEmployeeData.length / 3);
    setTotalPages(totalPagesCount);
  }, [AllEmployeeData]);

  const AllEmployee = async () => {
    try {
      let data = await fetch(
        "http://localhost:5050/Auth/employee//allUserdata/withoutPagination",
        {
          method: "GET",
        }
      );

      const result = await data.json();
      SetAllEmployeeData(result);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(AllEmployeeData.length);

  const EmployeeData = async () => {
    try {
      let data = await fetch(
        `http://localhost:5050/Auth/employee/AllEmployeeData?page=${currentPage}`,
        {
          method: "GET",
        }
      );

      const result = await data.json();
      setEmployeeDatas(result);
    } catch (error) {
      console.log(error);
    }
  };

  const total = employeeDatas.length;

  const searchProduct = async (event) => {
    let key = event.target.value;
    if (key) {
      let result = await fetch(
        `http://localhost:5050/Auth/employee/search/${key}`
      );
      result = await result.json();
      if (result) {
        setEmployeeDatas(result);
      }
    } else {
      EmployeeData();
    }
  };

  const updateEmployee = (id) => {
    navigate("/update/" + id);
  };

  const deleteEmployee = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5050/Auth/employee/deleteEmployee/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();
      toast.success("Deleted Successfully");
      navigate("/home");
    } catch (error) {}
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <section>
      <div className="userData-container">
        <div className="employee-search-and-create">
          <div className="search-data">
            <input
              type="search"
              placeholder="Search"
              onChange={searchProduct}
            />
          </div>
          <div>{employeeDatas.length}</div>
          <div>{currentPage}</div>
          <div>
            <NavLink to="/createNew">
              <button className="create-new-employee">Create Employee</button>
            </NavLink>
          </div>
        </div>
        <div className="user-data-lists">
          <table>
            <thead>
              <tr>
                <th>Profile</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Designation</th>
                <th>Gender</th>
                <th>Course</th>
                <th>Delete</th>
                <th>Update</th>
              </tr>
            </thead>
            <tbody>
              {employeeDatas && employeeDatas.map((curEle) => {
                return (
                  <tr key={curEle._id}>
                    <td>
                      <img src={curEle.image.URL} alt="User" style={{width:'50px', height:'50px'}}/>
                    </td>
                    <td>{curEle.name}</td>
                    <td>{curEle.email}</td>
                    <td>{curEle.mobile}</td>
                    <td>{curEle.designation}</td>
                    <td>{curEle.gender}</td>
                    <td>
                      <ul>
                        {curEle.courses && curEle.courses.map((cours, index) => {
                          return <li key={index} style={{listStyleType:"none"}}>{cours.course}</li>;
                        })}
                      </ul>
                    </td>
                    <td>
                      <button onClick={() => deleteEmployee(curEle._id)}>
                        Delete
                      </button>
                    </td>
                    <td>
                      <button onClick={() => updateEmployee(curEle._id)}>
                        Update
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div>
          <ul className="pagination">
            <li>
              <button onClick={handlePrevPage} disabled={currentPage === 1}>
                Prev
              </button>
            </li>
            {[...Array(totalPages).keys()].map((page) => (
              <li key={page + 1}>
                <button
                  onClick={() => handlePageChange(page + 1)}
                  className={currentPage === page + 1 ? "active" : ""}
                >
                  {page + 1}
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default EmployeeList;
