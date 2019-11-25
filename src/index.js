import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';

import './index.css';
import Calendar from './App';
import Empresas from './screens/Empresas'
import Consulta from './screens/Consulta'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

ReactDOM.render(

<Provider store={store}>
  <BrowserRouter>
    <Switch>
      <Route path='/' exact={true} component={Calendar} /> 
      <Route path='/empresas' component={Empresas} />
      <Route path='/consulta' component={Consulta} />
    </Switch>
  </ BrowserRouter>
</Provider>,

document.getElementById('root'));


