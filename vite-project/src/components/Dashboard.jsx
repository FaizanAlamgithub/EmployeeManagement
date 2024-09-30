import React, { useState, useEffect } from "react";

const styles = {
  marginTop: "5rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

function Dashboard() {
  const [loggedInUser, setLoggedInUser] = useState("");

  useEffect(() => {
    const user = localStorage.getItem("loggedInUser");
    setLoggedInUser(user);
  }, []);
  return (
    <div style={styles}>
      <h1>Welcome Back ! {loggedInUser}</h1>
    </div>
  );
}

export default Dashboard;
