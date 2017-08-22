import React from 'react';
import ReactDOM from 'react-dom';
import { RealTime } from './components/RealTime'
import { Historical } from './components/Historical'
import './sass/index.scss';

Date.prototype.yyyymmdd = function() {
  
  let mm = this.getMonth() + 1; 
  let dd = this.getDate();

  return this.getFullYear()+"-"+
          (mm>9 ? '' : '0') + mm+"-"+
          (dd>9 ? '' : '0') + dd;      
};


ReactDOM.render(
  <div className="App__content">   
    <h1>Bitcoin Dashboard</h1>
    <RealTime className="RealTime"/>
    <Historical />
  </div>, 
  document.getElementById('root')
)