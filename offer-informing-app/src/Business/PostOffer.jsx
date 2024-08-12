import React, { useState } from 'react';
import axios from 'axios';

const PostOffer = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [validity, setValidity] = useState('');
  const [location, setLocation] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [error, setError] = useState(null);

  const handlePostOffer = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/offers/post', {
        title,
        description,
        image,
        validity,
        location,
        latitude,
        longitude
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      console.log('Offer posted:', response.data);
    } catch (err) {
      setError('Error posting offer.');
      console.error(err);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-xl shadow-lg space-y-6">
      <h2 className="text-3xl font-bold text-gray-800">Post a New Offer</h2>
      <form onSubmit={handlePostOffer} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input input-bordered w-full"
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="textarea textarea-bordered w-full"
          required
        />
        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="input input-bordered w-full"
          required
        />
        <input
          type="date"
          placeholder="Validity"
          value={validity}
          onChange={(e) => setValidity(e.target.value)}
          className="input input-bordered w-full"
          required
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="input input-bordered w-full"
          required
        />
        <input
          type="number"
          placeholder="Latitude"
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
          className="input input-bordered w-full"
          required
        />
        <input
          type="number"
          placeholder="Longitude"
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
          className="input input-bordered w-full"
          required
        />
        <button type="submit" className="btn btn-primary w-full">Post Offer</button>
      </form>
      {error && <p className="text-red-600">{error}</p>}
    </div>
  );
};

export default PostOffer;
