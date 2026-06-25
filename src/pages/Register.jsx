import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../store/useStore";

const Register = () => {
  const setUser = useStore((state) => state.setUser);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    mobile: "",
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const tempErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^\d{10}$/;

    if (!formData.name.trim()) tempErrors.name = "Name is required.";
    if (!formData.username.trim()) tempErrors.username = "Username is required.";
    if (!emailPattern.test(formData.email)) tempErrors.email = "Valid email is required.";
    if (!phonePattern.test(formData.mobile)) tempErrors.mobile = "Mobile must be exactly 10 digits.";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleFormSubmission = (event) => {
    event.preventDefault();

    console.log("Form Submitted! Errors:", validateForm());
    
    // If validation passes, save to global store and navigate!
    if (validateForm()) {
      setUser(formData);
      navigate("/categories"); 
    }
  };

  return (
    <div className="app-container fade-in" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <form onSubmit={handleFormSubmission} className="form-container">
        <h2 style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--accent-green)', textAlign: 'center', marginBottom: '1rem' }}>
          Super App
        </h2>
        <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
          Create your new account
        </p>

        <div>
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          {errors.name && <span className="error-text">{errors.name}</span>}
        </div>
        
        <div>
          <input
            type="text"
            placeholder="Username"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          />
          {errors.username && <span className="error-text">{errors.username}</span>}
        </div>
        
        <div>
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          {errors.email && <span className="error-text">{errors.email}</span>}
        </div>
        
        <div>
          <input
            type="text"
            placeholder="Mobile"
            value={formData.mobile}
            onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
          />
          {errors.mobile && <span className="error-text">{errors.mobile}</span>}
        </div>
        
        <button type="submit">SIGN UP</button>
      </form>
    </div>
  );
};

export default Register;