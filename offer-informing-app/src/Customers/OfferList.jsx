import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OfferList = () => {
    const [offers, setOffers] = useState([]);
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    setLatitude(position.coords.latitude);
                    setLongitude(position.coords.longitude);
                },
                err => setError(err.message)
            );
        } else {
            setError('Geolocation is not supported by this browser.');
        }
    }, []);

    useEffect(() => {
        if (latitude !== null && longitude !== null) {
            axios.get('http://localhost:5000/api/offers/nearby', {
                params: {
                    latitude,
                    longitude,
                    radius: 10
                }
            })
            .then(response => {
                const filteredOffers = response.data.filter(offer => filter === 'all' || offer.type === filter);
                setOffers(filteredOffers);
            })
            .catch(err => {
                setError('Error fetching offers.');
                console.error(err);
            });
        }
    }, [latitude, longitude, filter]);

    const handleFilterChange = (e) => {
        setFilter(e.target.value);
    };

    return (
        <div>
            {error && <p>{error}</p>}
            <h2>Offers Near You</h2>
            <select onChange={handleFilterChange} value={filter}>
                <option value="all">All</option>
                <option value="discount">Discounts</option>
                <option value="event">Events</option>
            </select>
            <ul>
                {offers.map(offer => (
                    <li key={offer._id}>
                        <h3>{offer.title}</h3>
                        <p>{offer.description}</p>
                        <img src={offer.image} alt={offer.title} style={{ width: '100px', height: '100px' }} />
                        <p>Valid until: {new Date(offer.validity).toLocaleDateString()}</p>
                        <button onClick={() => handleClaim(offer._id)}>Claim Offer</button>
                    </li>
                ))}
            </ul>
        </div>
    );

    function handleClaim(offerId) {
        // Implement claim offer logic here
        console.log(`Claiming offer with ID: ${offerId}`);
    }
};

export default OfferList;
