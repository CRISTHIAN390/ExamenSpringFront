import React, { useState } from 'react';
import AuthService from '../services/authService';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    AuthService.login(email, password).then(
      () => {
        navigate('/profile'); // Redirigir al perfil después de iniciar sesión
      },
      error => {
        setMessage('Error de autenticación');
      }
    );
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
        {message && <div>{message}</div>}
      </form>
    </div>
  );
};

export default Login;