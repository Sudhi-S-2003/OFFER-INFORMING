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
        <div>
            <h2>Post a New Offer</h2>
            <form onSubmit={handlePostOffer}>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Image URL"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    required
                />
                <input
                    type="date"
                    placeholder="Validity"
                    value={validity}
                    onChange={(e) => setValidity(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Latitude"
                    value={latitude}
                    onChange={(e) => setLatitude(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Longitude"
                    value={longitude}
                    onChange={(e) => setLongitude(e.target.value)}
                    required
                />
                <button type="submit">Post Offer</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    );
};

export default PostOffer;
