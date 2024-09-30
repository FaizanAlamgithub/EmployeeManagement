import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import avatar from "../assets/images/profile.png";
import "./NewListing.css";

const NewListing = () => {
  const [formData, setFormData] = useState({
    myFile: "",
    name: "",
    email: "",
    mobile: "",
    designation: "",
    gender: "",
    course: "",
  });

  const navigate = useNavigate();

  const handleRadioChange = (e) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      course: value,
    }));
  };

  const handleGenderChange = (e) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      gender: value,
    }));
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setFormData({ ...formData, myFile: base64 });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:4000/api/listing/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormData({
          myFile: "",
          name: "",
          email: "",
          mobile: "",
          designation: "",
          gender: "",
          course: "",
        });
        navigate("/list");
      } else {
        alert("Image Size must be 20kb to create Listing");
      }
    } catch (error) {
      console.error("Error creating listing:", error);
      alert("An error occurred while creating the listing.");
    }
  };

  return (
    <div className="container">
      <div className="row mt-5">
        <div className="form-container">
          <h3>Create a New Listing</h3>
          <form onSubmit={handleSubmit} className="needs-validation" novalidate>
            <div className="mb-3 col">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                name="name"
                placeholder="Enter name"
                type="text"
                className="form-control"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                name="email"
                placeholder="Enter email"
                type="email"
                className="form-control"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <div className="valid-feedback">Email looks good!</div>
            </div>
            <div className="mb-3 col">
              <label htmlFor="mobile" className="form-label">
                Mobile
              </label>
              <input
                name="mobile"
                placeholder="Enter mobile"
                className="form-control"
                value={formData.mobile}
                onChange={handleChange}
                required
              />
              <div className="invalid-feedback">
                Please enter a valid mobile number
              </div>
            </div>
            <div className="mb-3 col">
              <label htmlFor="designation" className="form-label">
                Designation
              </label>
              <select
                name="designation"
                className="form-select"
                value={formData.designation}
                onChange={handleChange}
                required
              >
                <option value="">Select Designation</option>
                <option value="HR">HR</option>
                <option value="Manager">Manager</option>
                <option value="Sales">Sales</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Gender</label>
              <div className="form-check">
                <input
                  name="gender"
                  type="radio"
                  value="Male"
                  className="form-check-input"
                  checked={formData.gender === "Male"}
                  onChange={handleGenderChange}
                  required
                />
                <label className="form-check-label" htmlFor="genderMale">
                  Male
                </label>
              </div>
              <div className="form-check">
                <input
                  name="gender"
                  type="radio"
                  value="Female"
                  className="form-check-input"
                  checked={formData.gender === "Female"}
                  onChange={handleGenderChange}
                  required
                />
                <label className="form-check-label" htmlFor="genderFemale">
                  Female
                </label>
              </div>
              <div className="invalid-feedback">Please select a gender</div>
            </div>

            <div className="mb-3">
              <label className="form-label">Select Course</label>
              <div className="form-check">
                <input
                  name="course"
                  type="checkbox"
                  value="MCA"
                  className="form-check-input"
                  checked={formData.course === "MCA"}
                  onChange={handleRadioChange}
                />
                <label className="form-check-label" htmlFor="courseMCA">
                  MCA
                </label>
              </div>

              <div className="form-check">
                <input
                  name="course"
                  type="checkbox"
                  value="BCA"
                  className="form-check-input"
                  checked={formData.course === "BCA"}
                  onChange={handleRadioChange}
                />
                <label className="form-check-label" htmlFor="courseBCA">
                  BCA
                </label>
              </div>
              <div className="form-check">
                <input
                  name="course"
                  type="checkbox"
                  value="BSc"
                  className="form-check-input"
                  checked={formData.course === "BSc"}
                  onChange={handleRadioChange}
                />
                <label className="form-check-label" htmlFor="courseBSc">
                  BSc
                </label>
              </div>
              <div className="invalid-feedback">Please select a course</div>
            </div>

            <div className="mb-3">
              <label htmlFor="file-upload" className="form-label">
                <img src={formData.myFile || avatar} alt="" width={60} />
              </label>
              <input
                type="file"
                label="image"
                name="myFile"
                id="file-upload"
                accept=".jpeg, .png, .jpg"
                onChange={(e) => handleFileUpload(e)}
              />
            </div>
            <br />
            <button className="btn">Create</button>
            <br />
            <br />
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewListing;

function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    let fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
}
