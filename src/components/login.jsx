import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();


  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Send login request to the server
      const response = await fetch('https://frontend-take-home-service.fetch.com/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email }),
        credentials: 'include', // Include cookies with the request
      });

      if (response.ok) {
      console.log('login successful')
     
      console.log(email, name)
        
        // navigate('/search'); // if log-in is good it will redirect to the search page
        navigate(`/search/${email}/${name}`);

      } else {
        
        console.log('login failed')
       
      }
    } catch (error) {
      // Handle network error
    }
  };

  const handleGetCookie = async () => {
    try {
      const response = await fetch('https://frontend-take-home-service.fetch.com', {
        method: 'GET',
        credentials: 'include', // Include cookies with the request
      });

      if (response.ok) {
        const cookies = response.headers.get('set-cookie');
        if (cookies) {
          const fetchAccessTokenCookie = cookies
            .split(';')
            .find((cookie) => cookie.startsWith('fetch-access-token'));

          if (fetchAccessTokenCookie) {
            const [, cookieValue] = fetchAccessTokenCookie.split('=');
            // Set the cookie value to "Cookie" header for subsequent requests
            document.cookie = `fetch-access-token=${cookieValue}; SameSite=None; Secure`;
          }
        }
      } else {

      console.log("Cookie error")
        
      }
    } catch (error) {
     console.log("there is a  problem")
    }
  };

  useEffect(() => {
    handleGetCookie();
  }, []);

  return (
    <form onSubmit={handleLogin}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
