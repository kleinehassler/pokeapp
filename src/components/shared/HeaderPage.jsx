import React from 'react';
import { Link } from 'react-router-dom';

const HeaderPage = () => {
  return (
    <div>
        <Link to="/pokedex">
          <img src="../public/assets/headerpage.png" alt="header page" style={{ cursor: 'pointer' }}/>
        </Link>
    </div>
  )
}

export default HeaderPage;