import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom'; 
import { WEBNAME } from './globals';
import './index.css';

document.title = WEBNAME;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter> 
    <App />
  </BrowserRouter>
);
