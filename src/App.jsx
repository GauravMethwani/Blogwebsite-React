import  { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavigationBar from './Components/NavigationBar';
import BlogPost from './Pages/BlogPost';
import Home from './Pages/Home';
import Footer from './Components/Footer';
import BlogPage from './Pages/BlogPage';
import Signup from './Pages/Signup';
import Login from './Pages/Login';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = () => {
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
    };

    return (
        <Router>
            <NavigationBar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
            <Routes>
                <Route path="/" exact element={<Home />} />
                {isLoggedIn && <Route path="/BlogPost" exact element={<BlogPost />} />}
                {isLoggedIn &&   <Route path="/BlogPage/:id" element={<BlogPage />} />}
                {!isLoggedIn && <Route path="/Signup" element={<Signup />} />}
                {!isLoggedIn && <Route path="/Login" element={<Login onLogin={handleLogin} />} />}
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;
