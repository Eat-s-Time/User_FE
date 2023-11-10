import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import Router from './Router';
import { RecoilRoot } from 'recoil';

ReactDOM.render(
  <RecoilRoot>
  <BrowserRouter>
    <App/>
  </BrowserRouter>
  </RecoilRoot>,
  document.getElementById('root')
);
