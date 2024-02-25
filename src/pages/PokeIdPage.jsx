import React, { useEffect } from 'react';
import useFetch from '../hooks/useFetch';
import { useParams } from 'react-router-dom';
import '../components/pokeIdPage/style/pokeIdPage.css';
import HeaderPage from '../components/shared/HeaderPage';

const PokeIdPage = () => {
  const [pokeData, getPokeData] = useFetch();
  const param = useParams();

  useEffect(() =>{
    const url = `https://pokeapi.co/api/v2/pokemon/${param.id}`;
    getPokeData(url);
    }, []);
    
  return (
    <div>
      <HeaderPage />    
      <div className='poke1__container'>
        <article className='poke1__article'>
          <img src={pokeData?.sprites.other["official-artwork"].front_default} alt="pokemon figure"  />
          <h3 className='poke1__name'>{pokeData?.name}</h3>
          <hr />
          <ul className='poke1_data1'>
            <li>Order: <span>{pokeData?.order}</span></li>
            <li>Height: <span>{pokeData?.height}</span></li>
            <li>Weight: <span>{pokeData?.weight}</span></li>
          </ul>
          <hr />
          <div>
            <ul className='ul__type'>
              <li>Type: {pokeData?.types[0].type.name}</li>
              <li>Ability:{pokeData?.abilities[0].ability.name}</li>
            </ul>
          </div>
          <div>
            <h3 className='stats__title'>Stats</h3>
            <hr />
            <div className='poke1__statscontainer'>
            <ul className='poke1__stats'>
            {
              pokeData?.stats.map(stat => (
                !stat.stat.name.includes('special') &&
                <li key={stat.stat.url}>
                  <div className="stat-bar">
                    <div className="background"></div>
                    <div className={`fill ${stat.stat.name.toLowerCase()}`} style={{ width: `${stat.base_stat}%` }}></div>
                  </div>
                  <div className='poke1_stat_data'>
                  {stat.stat.name} : {stat.base_stat}
                  </div>
                </li>
              ))
            }
            </ul>
            </div>
          </div>
        </article>
      </div>
  </div>
  )
}

export default PokeIdPage;