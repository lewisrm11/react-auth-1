// Login.js
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {AuthContext} from '../context/AuthContext'
import axios from 'axios';

function LoginComponent() {
  //console.log("\x1b[35m 5.- Carga LoginComponent\x1b[0m")
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [errors, setErrors] = useState({}); // State for validation errors

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = {};

    if (!username) {
      validationErrors.username = 'Username is required';
    }
    if (!password) {
      validationErrors.password = 'Password is required';
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      login({ email: username, password }); // Call login function from context
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>

        {errors.username && <p className="error">{errors.username}</p>}
        {errors.password && <p className="error">{errors.password}</p>}

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginComponent;
