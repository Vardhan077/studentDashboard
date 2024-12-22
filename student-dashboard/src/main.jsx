import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import App from './App';
import './style.css';

console.log(typeof(App),"is PPPP"); // Check what App resolves to

ReactDOM.createRoot(document.getElementById('root')).render(
  
 <Provider store={store}>
    
 <>
    
  <App /> 
 </>
</Provider> 
  
);
