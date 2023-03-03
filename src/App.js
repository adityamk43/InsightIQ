import './App.css';
import Home from './components/Home/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import InsightIQ from './components/InsightIQ/InsightIQ';
import { ToastContainer } from 'react-toastify';
import Contact from './components/Contact/Contact';
import About from './components/About/About';
import Register from './components/Auth/Register/Register';
import Login from './components/Auth/Login/Login';
import Auth from './components/Auth/Auth';
import ProtectedRoute from './components/Util/ProtectedRoute';
import ChangePassword from './components/ChangePassword/ChangePassword';
import ResetPassword from './components/ResetPassword/ResetPassword';
import ResetEmailForm from './components/ResetPassword/ResetEmailForm';
import NotFound from './components/NotFound/NotFound';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/auth' element={<Auth />}>
            <Route path='login' element={<Login />} />
            <Route path='register' element={<Register />} />
          </Route>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/contact' element={<Contact />} />
          <Route exact path='/about' element={<About />} />

          <Route path='/insight-iq/*' element={
            <ProtectedRoute>

              <Routes>
                <Route path='/' element={<InsightIQ />} />
              </Routes>
              <Routes>
                <Route path='/change-password' element={<ChangePassword />} />
              </Routes>
            </ProtectedRoute>
          } />

          <Route path='/reset-password' element={<ResetEmailForm />} />
          <Route path='/api/user/reset/:uid/:token' element={<ResetPassword />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
