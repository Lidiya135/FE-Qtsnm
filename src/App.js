import React from "react";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Barang from './pages/Barang';
import Filter from './pages/FilterType'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/barang" />} replace="true" />
        <Route path="/barang" element={<Barang />} />
        <Route path="/type/:jenis_barang" element={<Filter />} />
      </Routes>
    </BrowserRouter>
   
  );
};

export default App;