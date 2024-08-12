import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddShop = () => {
  const [shopData, setShopData] = useState({
    name: '',
    address: '',
    contact: '',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setShopData({
      ...shopData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/shops/add', shopData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate('/Auth/Business/ViewShops');
    } catch (err) {
      console.error(err);
      alert('Error adding shop. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Add New Shop</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-control mb-4">
            <label className="label" htmlFor="name">Shop Name</label>
            <input
              type="text"
              name="name"
              id="name"
              className="input input-bordered w-full"
              placeholder="Enter shop name"
              value={shopData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-control mb-4">
            <label className="label" htmlFor="address">Address</label>
            <textarea
              name="address"
              id="address"
              className="textarea textarea-bordered w-full"
              placeholder="Enter shop address"
              value={shopData.address}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-control mb-4">
            <label className="label" htmlFor="contact">Contact Number</label>
            <input
              type="text"
              name="contact"
              id="contact"
              className="input input-bordered w-full"
              placeholder="Enter contact number"
              value={shopData.contact}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-control mt-6">
            <button type="submit" className="btn btn-primary w-full" disabled={loading}>
              {loading ? 'Adding Shop...' : 'Add Shop'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddShop;
