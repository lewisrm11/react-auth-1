// Register.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function RegisterComponent() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

// Register.js
const handleRegister = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post('http://localhost:8002/api/register', {
      name: "jim",
      email:username,
      password,
      perfil: "none"
    });
    // Handle successful registration
    if (response.data.success) {
      alert('Registration successful');
      navigate('/login');
    } else {
      alert('Registration failed');
    }
  } catch (error) {
    console.error('Registration error:', error);
    // Handle errors appropriately
  }
};

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleRegister}>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default RegisterComponent;