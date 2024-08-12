import React from 'react';
import axios from 'axios';

const ClaimOffer = ({ offerId }) => {
    const handleClaim = async () => {
        try {
            await axios.post(`http://localhost:5000/api/offers/claim/${offerId}`, {}, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            alert('Offer claimed successfully');
        } catch (err) {
            alert('Error claiming offer');
            console.error(err);
        }
    };

    return (
        <button onClick={handleClaim}>Claim Offer</button>
    );
};

export default ClaimOffer;
