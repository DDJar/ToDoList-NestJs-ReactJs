import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import GlobalStyle from '~/globalStyles';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <GlobalStyle>
        <App />
    </GlobalStyle>,
);
