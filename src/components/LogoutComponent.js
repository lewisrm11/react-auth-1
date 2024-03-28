// Logout.js
import React, { useContext, useState }  from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

function LogoutComponent({ onClick }) {
  //console.log("\x1b[33m 3.- Carga LogoutComponent\x1b[0m")
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  

  const handleLogout = async () => {
    await logout();    
  };

  return (
    <>
      <button onClick={handleLogout}>Logout orginal</button>
    </>
  );
}

export default LogoutComponent;