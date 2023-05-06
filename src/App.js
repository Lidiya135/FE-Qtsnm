import React from "react";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Barang from './pages/Barang';
// import test from './pages/test'
import ModalEdit from "./components/ModalEdit";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/barang" />} replace="true" />
        <Route path="/barang" element={<Barang />} />
        {/* <Route path="/tes" element={<Tes />} /> */}
      </Routes>
    </BrowserRouter>
   
  );
};

export default App;