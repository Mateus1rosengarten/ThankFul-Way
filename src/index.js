import React from 'react';
import { BrowserRouter} from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import UserContext from './context/userContext';
import PostContext from './context/postContext';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <BrowserRouter>
  <UserContext>
  <PostContext>
    <App />
    </PostContext>
    </UserContext>
    </BrowserRouter>

);

reportWebVitals();
