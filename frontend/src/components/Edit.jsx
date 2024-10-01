import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import avatar from "../assets/images/profile.png";
import "./Edit.css";

const EditListing = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    designation: "",
    gender: "",
    course: "",
    myFile: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const response = await fetch(
          `https://employeemanagement-backend-z5go.onrender.com/api/listing/edit/${id}`
        );
        if (!response.ok) {
          throw new Error("Error fetching the listing data");
        }
        const data = await response.json();
        setFormData(data);
        setLoading(false);
      } catch (error) {
        setError("Error fetching the listing data");
        setLoading(false);
      }
    };
    fetchListing();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://employeemanagement-backend-z5go.onrender.com/api/listing/update/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Error updating the listing");
      }

      navigate("/list");
    } catch (error) {
      setError("Error updating the listing");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container">
      <div className="row mt-5">
        <div className="form-container">
          <h3>Edit Listing</h3>
          <form onSubmit={handleSubmit} noValidate className="needs-validation">
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

            <div className="mb-3 col-md-4">
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
            <button className="btn">Update</button>
            <br />
            <br />
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditListing;

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
