import React from "react";
import Admin from "../../Images/Admin.jpg"
import "../../Style/AdminStyle.css"

const AdminDashboard = () => {
  return (
    <section>
      <div className="Home-data">
        <div className="Home-Container">
          <div className="Home-List-name">
            <h3>
              Welcome to <span>Admin Dashboard!</span>
            </h3>
            <p>Add Employee Data</p>
          </div>
          <div className="Home-Image">
            <img src={Admin} alt="Student" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;
