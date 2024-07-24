import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Components/Login/Login';
import ApiList from './Components/ApiList/ApiList';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/A7B9C3" element={<Login />} />
        <Route path="/Apix3873" element={<ApiList />} />
      </Routes>
    </Router>
  );
}

export default App;