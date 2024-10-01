import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import EmpoyeeList from "./EmployeeList";
import NewListing from "./NewListing";
import EditListing from "./Edit";
import Login from "./Login";
import Signup from "./Signup";
import Dashboard from "./Dashboard";
import RefreshHandler from "./RefreshHandler";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />;
  };
  return (
    <>
      <Router>
        <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route
            path="/home"
            element={<PrivateRoute element={<Dashboard />} />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/new" element={<NewListing />} />
          <Route path="/list" element={<EmpoyeeList />} />
          <Route path="/edit/:id" element={<EditListing />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
