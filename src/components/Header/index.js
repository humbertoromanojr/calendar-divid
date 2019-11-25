import React from 'react';
import { Link } from 'react-router-dom'
import './styles.css';

const Header = () => {
  return (
    <div>
      <header className="App-header">
        <small>Avariti</small>
        <h1>Calendário Dividendos</h1>
      </header>
      <div className="menu">
        <ul>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/Empresas'>Empresas</Link></li>
        </ul>
      </div>
    </div>
  )
}

export default Header;
