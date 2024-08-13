import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NearbyOffers = () => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');
  const [location, setLocation] = useState({ lat: null, lng: null });
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Fetch user profile 
    axios.get('http://localhost:5000/api/users/me', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
    .then(response => {
      setUserId(response.data._id);
    })
    .catch(error => {
      setError('Failed to fetch user data.');
    });
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          setError('Unable to retrieve location. Please enable geolocation.');
          setLoading(false);
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (location.lat && location.lng) {
      axios.get('http://localhost:5000/api/offers/nearby', {
        params: {
          latitude: location.lat,
          longitude: location.lng,
          radius: 1000
        },
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      .then((response) => {
        setOffers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError('Failed to fetch offers. Please try again later.');
        setLoading(false);
      });
    }
  }, [location]);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleClaimOffer = async (offerId) => {
    try {
      await axios.post(`http://localhost:5000/api/offers/claim/${offerId}`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      // Update the offers 
      setOffers((prevOffers) =>
        prevOffers.map((offer) =>
          offer._id === offerId
            ? { ...offer, claims: [...offer.claims, { user: userId, claimedDate: new Date() }] }
            : offer
        )
      );
    } catch (err) {
      setError('Failed to claim offer. Please try again later.');
    }
  };

  const filteredOffers = offers.filter((offer) => {
    if (filter === 'all') return true;
    return offer.type === filter;
  });

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Nearby Offers</h1>
        <select 
          value={filter} 
          onChange={handleFilterChange} 
          className="select select-bordered w-full max-w-xs border border-gray-300 rounded-lg p-2"
        >
          <option value="all">All</option>
          <option value="offer">Offers</option>
          <option value="discount">Discounts</option>
          <option value="special">Specials</option>
          <option value="event">Events</option>
          <option value="promotion">Promotions</option>
        </select>
      </div>
      {loading && <div className="text-center py-4">Loading...</div>}
      {error && <div className="bg-red-500 text-white p-2 rounded-lg mb-4">{error}</div>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredOffers.map((offer) => (
          <div key={offer._id} className="bg-white shadow-lg rounded-lg p-4">
            <h2 className="text-xl font-bold mb-2">{offer.title}</h2>
            <p className="mb-2">{offer.description}</p>
            <p className="text-sm text-gray-500 mb-4">{`Valid until: ${new Date(offer.validity).toLocaleDateString()}`}</p>
            <button
              onClick={() => handleClaimOffer(offer._id)}
              className={`btn btn-primary bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 ${offer.claims.some(claim => claim.user === userId) ? 'bg-gray-500 cursor-not-allowed' : ''}`}
              disabled={offer.claims.some(claim => claim.user === userId)}
            >
              {offer.claims.some(claim => claim.user === userId) ? 'Claimed' : 'Claim Offer'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NearbyOffers;
