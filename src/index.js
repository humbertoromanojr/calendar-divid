import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Calendar from './App';
import Empresas from './screens/Empresas'
import Consulta from './screens/Consulta'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

ReactDOM.render(

<BrowserRouter>
 <Switch>
  <Route path='/' exact={true} component={Calendar} /> 
  <Route path='/empresas' component={Empresas} />
  <Route path='/consulta' component={Consulta} />
 </Switch>
</ BrowserRouter>,

document.getElementById('root'));


