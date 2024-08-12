import React from 'react';
import {  Routes,Route } from "react-router-dom";
import PostOffer from './PostOffer';
import ViewOffer from './ViewOffers'
import CreatePolls from './CreatePoll'
import ViewPolls from './ViewPolls'
import Dashboard from './Dashboard';
const Business = () => {
  return (
    <>
    <Routes>
    <Route path='/' element={<Dashboard/>}/>
      <Route path='/PostOffer' element={<PostOffer/>}/>
      <Route path='/ViewOffers' element={<ViewOffer/>}/>
      <Route path='/CreatePoll' element={<CreatePolls/>}/>
      <Route path='/ViewPolls' element={<ViewPolls/>}/>
      
    </Routes>
   
    </>
  );
};

export default Business;
