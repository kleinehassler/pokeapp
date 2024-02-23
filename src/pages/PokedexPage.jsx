import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import pokemonNameSlice, { setPokemonName } from '../store/slices/pokemonName.slice';
import useFetch from '../hooks/useFetch';
import PokeCard from '../components/pokedexPage/PokeCard';
import SelectType from '../components/pokedexPage/SelectType';
import './styles/pokedexPage.css';

const PokedexPage = () => {

  const [ selectValue, setSelectValue ] = useState('allPokemons');
  const trainerName = useSelector( store => store.trainerName);
  const pokemonName = useSelector( store => store.pokemonName);
  const dispatch = useDispatch();
  const [ pokemons, getPokemons, getPerType ] = useFetch();
  
  useEffect(() => {
    if (selectValue === 'allPokemons'){
      const url = "https://pokeapi.co/api/v2/pokemon/?limit=100";
      getPokemons(url);
    } else  {
      getPerType(selectValue);
    }
  }, [selectValue]);

  const textInput = useRef();  
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(setPokemonName(textInput.current.value.trim().toLowerCase()));
    textInput.current.value = '';
  }

  const cbFilter = () => {
    if (pokemonName) {
      return pokemons?.results.filter(element => element.name.includes(pokemonName));
      //return pokemons?.results.includes(pokemonName);
    } else {
      return pokemons?.results; 
    }
  }

//  console.log(setSelectValue);
  
 return (
    <div>
      <section className='poke__header'>
        <h3><span>Bienvenido {trainerName},</span> Aqui podras encontrar a tu Pokemon Favorito</h3>
        <div>
          <form onSubmit={handleSubmit}>
            <input type="text" ref={textInput} />
            <button>Buscar</button>
          </form>
          <SelectType 
            setSelectValue={setSelectValue}
          />
        </div>
      </section>
      <section className='poke__container'>
        {
          //pokemons?.results.map(poke => (
          cbFilter()?.map(poke => (
            <PokeCard 
              key={poke.url}
              url={poke.url}
            />
         ))
        }
      </section>
    </div>
  )
}

export default PokedexPage;