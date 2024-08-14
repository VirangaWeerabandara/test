import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';

//pages and components
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Navbar from './components/Navbar';

function App() {
  const { user } = useAuthContext();

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div>
          <Routes>
            <Route
              path="/"
              element={user ? <Home /> : <Navigate to="/login" />}
              // element={<Home />}
            />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
              // element={<Login />}
            />
            <Route
              path="/signup"
              element={!user ? <Signup /> : <Navigate to="/" />}
              // element={<Signup />}
            /> 
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
