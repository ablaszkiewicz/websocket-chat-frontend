import { ColorModeScript } from '@chakra-ui/react';
import axios from 'axios';
import * as React from 'react';
import ReactDOM from 'react-dom';
import { App } from './pages/App';
import * as serviceWorker from './serviceWorker';

export const baseUrl = 'http://localhost:3001';
//export const baseUrl = 'https://wschatserv.bieda.it';

axios.defaults.baseURL = baseUrl;

ReactDOM.render(
  <React.StrictMode>
    <ColorModeScript />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorker.unregister();
