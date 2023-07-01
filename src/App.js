import React from 'react';
import { useParams, Route, Routes } from 'react-router-dom';
import Login from './components/login';
import SearchPage from './components/search';
import Home from './components/home';


import './App.css';


function App() {
  return (
 
      <Routes>
        

        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/search/:email/:name" element={<SearchPage />} />
      
     

      </Routes>
     
 
  );
}

export default App;
