
import { Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import './App.css';
import HomePage from './pages/HomePages';
import PokedexPage from './pages/PokedexPage';
import PokeIdPage from './pages/PokeIdPage';
import ProtectedRoutes from './pages/ProtectedRoutes';


function App() {

  return (
   <Routes>
      <Route path='/' element={<HomePage/>} />
      <Route element={<ProtectedRoutes/>}>
        <Route path='pokedex' element={<PokedexPage/>} />
        <Route path='pokedex/:id' element={<PokeIdPage/>} />
      </Route>
  </Routes>
  )
}

export default App;
