import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import Router from './Router';

ReactDOM.render(
  <BrowserRouter>
    <Router/>
  </BrowserRouter>,
  document.getElementById('root')
);
