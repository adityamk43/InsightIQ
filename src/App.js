import './App.css';
import Home from './components/Home/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MyNavbar from './components/Navbar/Navbar';
import InsightIQ from './components/InsightIQ/InsightIQ';
import { ToastContainer } from 'react-toastify';
import Contact from './components/Contact/Contact';
import About from './components/About/About';
import Register from './components/Register/Register';
import Login from './components/Login/Login';

function App() {
  return (
    <>
      <Router>
        <MyNavbar />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/insight-iq' element={<InsightIQ />} />
          <Route exact path='/contact' element={<Contact />} />
          <Route exact path='/about' element={<About />} />
          <Route exact path='/register' element={ <Register/>} />
          <Route exact path='/login' element={ <Login/>} />
        </Routes>
      </Router>     
      <ToastContainer />
    </>
  );
}

export default App;
