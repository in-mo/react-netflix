import React from "react";
import "./App.css"
import { Route, Routes } from "react-router-dom";
import Layout from "./pages/Layout";
import MainPage from "./pages/MainPage";
import DetailPage from "./pages/DetailPage";
import SearchPage from "./pages/SearchPage";

const App = () => {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path=":movieId" element={<DetailPage />} />
          <Route path="search" element={<SearchPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;