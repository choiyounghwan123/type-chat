import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/'></Route>
        <Route path='/login'></Route>
        <Route path='/main'></Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
