import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import AuthProvider from './context/AuthContext';
import { AuthContext } from './context/AuthContext';
import { useNavigate } from 'react-router-dom';

import { Navigate } from 'react-router-dom';

import LoginComponent from './components/LoginComponent';
import RegisterComponent from './components/RegisterComponent';
import LandingPage from './components/LandingPage';
import DashboardComponent from './components/DashboardComponent'; // Import the components+

import LogoutComponent from './components/LogoutComponent';

const X = ({ children }) => {
  //console.log("\x1b[31m 1.- CARGA X COMPONENT\x1b[0m")
  return children;
}

const PrivateRoute = ({ children }) => {
  //const navigate = useNavigate();

  const { isAuthenticated } = useContext(AuthContext);

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const PublicRoute = ({ children }) => {
  //console.log("\x1b[34m 4.- Carga PublicRoute\x1b[0m")
  //console.log("\x1b[34m ---------------------------------\x1b[0m")
  const { isAuthenticated } = useContext(AuthContext);

  //console.log("\x1b[34m isAuthenticated \x1b[0m", isAuthenticated)

  return !isAuthenticated ? children : <Navigate to="/dashboard" replace />; // Redirect to dashboard if authenticated
};

function App() {
  return (
    <Router>
      <X>
        <AuthProvider>
          <nav>
            <Link to="/logout">Logout</Link> <br></br>
            <Link to="/login">Login</Link> <br></br>
            <Link to="/dashboard">Dashboard</Link> <br></br>
            <Link to="/register">Register</Link> <br></br>
          </nav>
          <Routes>
            <Route path="/logout" element={<LogoutComponent />} />

            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<PublicRoute><LoginComponent /></PublicRoute>} />
            <Route path="/register" element={<PublicRoute><RegisterComponent /></PublicRoute>} />
            <Route path="/dashboard" element={
              <PrivateRoute>
                <DashboardComponent />
              </PrivateRoute>
            } />
          </Routes>
        </AuthProvider>
      </X>
    </Router >
  );
}

export default App;