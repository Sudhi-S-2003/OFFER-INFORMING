import React from 'react';
import { Routes, Route } from "react-router-dom";
import CustomerDashboard from './CustomerDashboard';
import ViewOffers from './NearbyOffers';
import ClaimedOffers from './ClaimedOffers';
import ParticipatePolls from './ParticipatePolls';
import VotedPolls from './VotedPolls';

const Customer = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<CustomerDashboard />} />
        <Route path='/ViewOffers' element={<ViewOffers />} />
        <Route path='/ClaimedOffers' element={<ClaimedOffers />} />
        <Route path='/ParticipatePolls' element={<ParticipatePolls />} />
        <Route path='/VotedPolls' element={<VotedPolls />} />
      </Routes>
    </>
  );
};

export default Customer;
