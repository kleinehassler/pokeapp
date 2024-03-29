
import React, { useRef } from 'react';
import { setTrainerName } from '../store/slices/trainerName.slice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './styles/homePage.css';

const HomePages = () => {
  const dispatch = useDispatch();
  //const trainerName = useSelector((store)=> store.trainerName);
  const navigate = useNavigate();
  const textInput = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch(setTrainerName(textInput.current.value.trim()));
    navigate('./pokedex');
  }

  return (
      <div className="home-container">
            <img src="/assets/pokedexapp.png" alt="imgage home" className='home-img' />
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                ref={textInput} 
              />
              <button type="submit">Comenzar</button>
            </form>
      </div>
  )
}

export default HomePages;