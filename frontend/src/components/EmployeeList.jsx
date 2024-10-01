import React, { useState, useEffect } from "react";
import "./EmployeeList.css";
import avatar from "../assets/images/profile.png";

const Listings = () => {
  const [listings, setListings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await fetch(
          "https://employeemanagement-backend-z5go.onrender.com/listing"
        );
        const data = await response.json();
        setListings(data);
      } catch (error) {
        console.error("Failed to fetch listings", error);
      }
    };

    fetchListings();
  }, []);

  const handleDelete = async (listingId) => {
    if (window.confirm("Are you sure you want to delete this listing?")) {
      try {
        const response = await fetch(
          `https://employeemanagement-backend-z5go.onrender.com/api/listing/delete/${listingId}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          setListings(listings.filter((listing) => listing._id !== listingId));
        } else {
          alert("Failed to delete the listing.");
        }
      } catch (error) {
        console.error("Error deleting listing:", error);
      }
    }
  };

  const handleClick = (listingId) => {
    console.log(`Navigating to listing with ID: ${listingId}`);
  };

  const filteredListings = listings.filter((listing) =>
    listing.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-5">
      <h3>Employee List</h3>
      <div className="d-flex justify-content-between align-items-center">
        <a href="/new" className="create-list">
          Create List
        </a>

        <input
          type="text"
          className="form-control w-25"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="mt-2">
        <p>Total Listings: {filteredListings.length}</p>
      </div>

      <div className="table-responsive mt-5">
        <table className="table text-center table-bordered">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Image</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Mobile</th>
              <th scope="col">Designation</th>
              <th scope="col">Gender</th>
              <th scope="col">Course</th>
              <th scope="col">Date</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredListings.map((listing) => (
              <tr key={listing._id} onClick={() => handleClick(listing._id)}>
                <td>{listing._id}</td>
                <td>
                  <img
                    src={listing.myFile || avatar}
                    alt="Avatar"
                    width={50}
                    height={50}
                    style={{ borderRadius: "50%" }}
                  />
                </td>
                <td>{listing.name}</td>
                <td>
                  <a href="#">{listing.email}</a>
                </td>
                <td>{listing.mobile}</td>
                <td>{listing.designation}</td>
                <td>{listing.gender}</td>
                <td>{listing.course}</td>
                <td>{new Date(listing.createdAt).toLocaleDateString()}</td>
                <td>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <a
                      href={`/edit/${listing._id}`}
                      style={{ marginRight: "10px", color: "black" }}
                      title="Edit"
                    >
                      <i className="fas fa-edit"></i>
                    </a>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(listing._id);
                      }}
                      style={{
                        border: "none",
                        background: "none",
                        cursor: "pointer",
                        color: "red",
                      }}
                      title="Delete"
                    >
                      <i className="fas fa-trash-alt"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Listings;
