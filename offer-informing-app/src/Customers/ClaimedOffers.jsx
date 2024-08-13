import { useEffect, useState } from 'react';
import axios from 'axios';

const ClaimedOffers = () => {
  const [claimedOffers, setClaimedOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Fetch user 
    axios.get('http://localhost:5000/api/users/me', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
    .then(response => {
      setUserId(response.data._id); 
    })
    .catch(error => {
      setError('Failed to fetch user data.');
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    // Fetch claimed 
    if (userId) {
      axios.get('http://localhost:5000/api/offers/claimedOffers', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
        .then((response) => {
          // Filter offers based on user 
          const filteredOffers = response.data.filter(offer =>
            offer.claims.some(claim => claim.user.toString() === userId)
          );
          setClaimedOffers(filteredOffers);
          setLoading(false);
        })
        .catch(() => {
          setError('Failed to fetch claimed offers');
          setLoading(false);
        });
    }
  }, [userId]);

  return (
    <div className="container mx-auto p-6">
      {loading && <div className="text-center py-4"><span className="loading loading-dots loading-lg"></span></div>}
      {error && <div className="alert alert-error mb-4"><span>{error}</span></div>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {claimedOffers.length > 0 ? (
          claimedOffers.map((offer) => (
            <div key={offer._id} className="card bg-white shadow-lg rounded-lg p-4 transition-transform transform hover:scale-105">
              <h2 className="text-xl font-semibold mb-2">{offer.title}</h2>
              <p className="mb-2">{offer.description}</p>
              <div className="text-sm text-gray-500">
                {offer.claims.map((claim) => 
                  claim.user.toString() === userId ? (
                    <p key={claim._id}>Claimed on: {new Date(claim.claimedDate).toLocaleDateString()}</p>
                  ) : null
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-4">No claimed offers available</div>
        )}
      </div>
    </div>
  );
};

export default ClaimedOffers;
