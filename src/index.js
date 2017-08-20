import React from 'react';
import ReactDOM from 'react-dom';
import { RealTime } from './components/RealTime'
import { Historical } from './components/Historical'
import './sass/index.scss';

Date.prototype.yyyymmdd = function() {
  var mm = this.getMonth() + 1; // getMonth() is zero-based
  var dd = this.getDate();

  return this.getFullYear()+"-"+
          (mm>9 ? '' : '0') + mm+"-"+
          (dd>9 ? '' : '0') + dd;
         
};


ReactDOM.render(
  <div className="App__content">
    <h1>Bitcoin Dashboar</h1>
    <RealTime className="RealTime"/>
    <Historical />
  </div>, 
  document.getElementById('root')
)