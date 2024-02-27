
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import pokemonNameSlice, { setPokemonName } from '../store/slices/pokemonName.slice';
import useFetch from '../hooks/useFetch';
import PokeCard from '../components/pokedexPage/PokeCard';
import SelectType from '../components/pokedexPage/SelectType';
import './styles/pokedexPage.css';
import HeaderPage from '../components/shared/HeaderPage';
import Pagination from '../components/pokedexPage/Pagination';

const PokedexPage = () => {

  const [ selectValue, setSelectValue ] = useState('allPokemons');
  const trainerName = useSelector( store => store.trainerName);
  const pokemonName = useSelector( store => store.pokemonName);
  const dispatch = useDispatch();
  const [ pokemons, getPokemons, getPerType ] = useFetch();
  const [currentPage, setCurrentPage] = useState(1);
 
  useEffect(() => {
    setCurrentPage(1);
    if (selectValue === 'allPokemons'){
      const url = "https://pokeapi.co/api/v2/pokemon/?limit=500";
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

  
  const quantity = 6;
  const second = currentPage * quantity;
  const first = second - quantity;
  const pokemonsPart = pokemons && pokemons.results.slice(first, second);
  const totalPages = pokemons && Math.floor(pokemons.results.length / quantity)+1;


  const cbFilter = () => {

    if (pokemonName) {
      return pokemonsPart?.results.filter(element => element.name.includes(pokemonName));
    } else {
      return pokemonsPart;      
      //return pokemonsPart?.results;      
    }
  }

  /* pagination */
  console.log(pokemonsPart);


 return (
    <div>
      <HeaderPage />
      <section className='poke__header'>
        <h3><span>Bienvenido {trainerName},</span> Aqui podras encontrar a tu Pokemon Favorito</h3>
        <div className='poke_search'>
          <form onSubmit={handleSubmit}>
            <input type="text" ref={textInput} />
            <button>Buscar</button>
          </form>
          <SelectType 
            setSelectValue={setSelectValue}
          />
        </div>
      </section>
      <Pagination 
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
                 
      <section className='poke__container'>
        {
          cbFilter()?.map(poke => (
            <PokeCard 
              key={poke.url}
              url={poke.url}
            />
         ))
        }
      </section>
      <Pagination 
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />

    </div>
  )
}

export default PokedexPage;