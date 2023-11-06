import React from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import CreateItem from '../components/CreateItem';
import ShowItems from '../components/ShowItems';
import Navbar from '../components/Navbar';

import Login from '../pages/Login';
import Signup from '../pages/Signup';

const Index = () => {
  return (
   <BrowserRouter>
        <Navbar />
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<ShowItems />} /> 
            <Route path="/create" element={<CreateItem />} />   
        </Routes>
   </BrowserRouter>
  )
}

export default Index