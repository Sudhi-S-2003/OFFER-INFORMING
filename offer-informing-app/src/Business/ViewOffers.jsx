import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ViewOffers = () => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/offers/myoffers', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setOffers(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching offers.');
        setLoading(false);
        console.error(err);
      }
    };

    fetchOffers();
  }, []);

  if (loading) return <p className="text-center text-gray-600">Loading...</p>;
  if (error) return <p className="text-center text-red-600">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">My Offers</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {offers.length > 0 ? (
          offers.map((offer) => (
            <div key={offer._id} className="bg-white rounded-lg shadow-md p-4 max-w-[450px]">
              <img
                src={offer.image}
                alt={offer.title}
                className="w-full h-72  rounded-t-lg mb-4 object-contain"
              />
              <h2 className="text-xl font-semibold mb-2">{offer.title}</h2>
              <p className="text-gray-700 mb-2">{offer.description}</p>
              <p className="text-gray-500 text-sm mb-2">Location: {offer.location}</p>
              <p className="text-gray-500 text-sm">Validity: {new Date(offer.validity).toLocaleDateString()}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">No offers available.</p>
        )}
      </div>
    </div>
  );
};

export default ViewOffers;
