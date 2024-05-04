
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Router components
 // Import the NumberCounter component
import NavigationBar from './Components/NavigationBar';

import BlogPost from './Pages/BlogPost';
import Home from './Pages/Home';
import Footer from './Components/Footer';
import BlogPage from './Pages/BlogPage';
import Signup from './Pages/Signup';
import Login from './Pages/Login';



 // Import the Navigation.css file for styling

function App() {   
 

  return (
    <Router>
      <NavigationBar/>
        <Routes>
        <Route path="/" exact element={<Home/>} />
          <Route path="/BlogPost" exact element={<BlogPost/>} />
          <Route path="/BlogPage/:id" element={<BlogPage/>} />
          <Route path="/Signup" element={<Signup/>} />
          <Route path="/Login" element={<Login/>} />
        </Routes>
        <Footer/>
    </Router>
  );
}

export default App;  


