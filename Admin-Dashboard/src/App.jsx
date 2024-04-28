import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminDashboard from "./Components/Admin/AdminDashboard";
import Navbar from "./Components/Navbar/Navbar";
import Login from "./Components/Authentication/Login";
import Signup from "./Components/Authentication/Signup";
import PrivateComponent from "./Context/PrivateComponent";
import EmployeeList from "./Components/Admin/EmployeeList";
import UpdateEmployee from "./Components/Admin/UpdateEmployee";
import CreateNew from "./Components/Admin/CreateNew";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route element={<PrivateComponent/>}>
            <Route path="/home" element={<AdminDashboard />} />
            <Route path="/employee" element={<EmployeeList/>}/>
            <Route path="/update/:id" element={<UpdateEmployee/>}/>
            <Route path="/createNew" element={<CreateNew/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
