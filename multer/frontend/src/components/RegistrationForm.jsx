import React, { useState } from 'react';
import axios from 'axios';

const RegistrationForm = ({ onSubmitSuccess }) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    dob: '',
    password: '',
    residentialAddress: '',
    permanentAddress: '',
  });

  const [sameAddress, setSameAddress] = useState(false);
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckbox = () => {
    const newSame = !sameAddress;
    setSameAddress(newSame);

    if (newSame) {
      setForm(prev => ({
        ...prev,
        permanentAddress: prev.residentialAddress
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('email', form.email);
    formData.append('dob', form.dob);
    formData.append('password', form.password);
    formData.append('residentialAddress', form.residentialAddress);
    formData.append('permanentAddress', form.permanentAddress);
    if (file) formData.append('file', file);

    try {
      await axios.post('http://localhost:5000/register', formData);
      alert('Registered successfully');
      if (onSubmitSuccess) onSubmitSuccess(); // trigger parent callback if provided

      // Reset form
      setForm({
        name: '',
        email: '',
        dob: '',
        password:'',
        residentialAddress: '',
        permanentAddress: '',
      });
      setSameAddress(false);
      setFile(null);
    } catch (err) {
      console.error(err);
      alert('Error submitting form');
    }
  };

  return (
    <div className="registration-card">
      <h2>Register Now</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Full Name</label>
          <input
            className="form-input"
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Email</label>
          <input
            className="form-input"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Password</label>
          <input
            className="form-input"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Date of Birth</label>
          <input
            className="form-input"
            type="date"
            name="dob"
            value={form.dob}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Residential Address</label>
          <textarea
            className="form-input"
            name="residentialAddress"
            value={form.residentialAddress}
            onChange={handleChange}
            required
          />
        </div>

        <div className="checkbox-group">
          <input
            type="checkbox"
            checked={sameAddress}
            onChange={handleCheckbox}
          />
          <label>Same as Residential Address</label>
        </div>

        <div className="form-group">
          <label className="form-label">Permanent Address</label>
          <textarea
            className="form-input"
            name="permanentAddress"
            value={form.permanentAddress}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Upload Document</label>
          <input
            className="form-input"
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            required
          />
        </div>

        <button type="submit" className="submit-btn">
          Submit Registration
        </button>
      </form>
    </div>
  );
};


export default RegistrationForm;