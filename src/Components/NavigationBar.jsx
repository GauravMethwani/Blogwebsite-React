import  { useState } from 'react';
import { Link } from 'react-router-dom';
import './NavigationBar.css'; // Import your navigation bar CSS file for styling

function NavigationBar() {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <nav className="navbar">
      <h1>BlogApp</h1>
      <button className="menu-btn" onClick={toggleMenu}>
        <div>
        <div className="bar1"></div>
        <div className="bar2"></div>
        <div className="bar3"></div>
        </div>
      </button>
      <ul className={showMenu ? 'show' : ''} id='unorder'>
        <li className='list'>
          <Link to="/">Home</Link>
        </li>
        <li className='list'>
          <Link to="/BlogPost">BlogPost</Link>
        </li>

        <li className='list'>
        <Link to="/Login">Login</Link>
      </li>
       
      </ul>

    </nav>
  );
}

export default NavigationBar;