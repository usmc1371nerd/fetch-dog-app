import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {AuthProvider} from 'react-auth-kit'
import App from './App';
import { BrowserRouter} from 'react-router-dom';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider    
    
    authType={"cookie"}
    authName={"cookie"}
    cookieSecure={true}>
      
    <BrowserRouter>
    <App/>
    </BrowserRouter>

    
    </AuthProvider>
  </React.StrictMode>
);


