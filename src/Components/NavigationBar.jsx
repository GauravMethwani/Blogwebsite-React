import  { useState } from 'react';
import { Link } from 'react-router-dom';
import './NavigationBar.css'; // Import your navigation bar CSS file for styling

// eslint-disable-next-line react/prop-types
function NavigationBar({ isLoggedIn, onLogout }) {
    const [showMenu, setShowMenu] = useState(false);
   console.log(isLoggedIn);
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
                {isLoggedIn && (
                    <li className='list'>
                        <Link to="/BlogPost">BlogPost</Link>
                    </li>
                )}
                {!isLoggedIn && (
                    <li className='list'>
                        <Link to="/Login">Login</Link>
                    </li>
                )}
                {isLoggedIn && (
                    <li className='list'>
                        <button onClick={onLogout}>Logout</button>
                    </li>
                )}
            </ul>
        </nav>
    );
}

export default NavigationBar;
