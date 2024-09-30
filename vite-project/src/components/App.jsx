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
          <Route
            path="/list"
            element={<PrivateRoute element={<EmpoyeeList />} />}
          />
          <Route path="/edit/:id" element={<EditListing />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

// import React, { useState, useEffect } from "react";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
//   useLocation,
//   useNavigate,
// } from "react-router-dom";
// import EmployeeList from "./EmployeeList";
// import NewListing from "./NewListing";
// import EditListing from "./Edit";
// import Login from "../Login";
// import Signup from "../Signup";
// import Dashboard from "./Dashboard";

// const RefreshHandler = ({ setIsAuthenticated }) => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   useEffect(() => {
//     if (localStorage.getItem("token")) {
//       setIsAuthenticated(true);
//       if (
//         location.pathname === "/" ||
//         location.pathname === "/login" ||
//         location.pathname === "/signup"
//       ) {
//         navigate("/home", { replace: true });
//       }
//     }
//   }, [location, navigate, setIsAuthenticated]);

//   return null;
// };

// const PrivateRoute = ({ isAuthenticated, children }) => {
//   return isAuthenticated ? children : <Navigate to="/login" />;
// };

// function App() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   return (
//     <Router>
//       <RefreshHandler setIsAuthenticated={setIsAuthenticated} />

//       <Routes>
//         <Route path="/" element={<Navigate to="/login" />} />

//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />

//         <Route
//           path="/home"
//           element={
//             <PrivateRoute isAuthenticated={isAuthenticated}>
//               <Dashboard />
//             </PrivateRoute>
//           }
//         />
//         <Route
//           path="/new"
//           element={
//             <PrivateRoute isAuthenticated={isAuthenticated}>
//               <NewListing />
//             </PrivateRoute>
//           }
//         />
//         <Route
//           path="/list"
//           element={
//             <PrivateRoute isAuthenticated={isAuthenticated}>
//               <EmployeeList />
//             </PrivateRoute>
//           }
//         />
//         <Route
//           path="/edit/:id"
//           element={
//             <PrivateRoute isAuthenticated={isAuthenticated}>
//               <EditListing />
//             </PrivateRoute>
//           }
//         />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
