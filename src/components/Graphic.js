import React, { PropTypes } from 'react'
import { Services } from './Services'
import {Line} from 'react-chartjs-2'

const formatDate = (date) => {
  const monthNames =[
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  
  let day = date.getDate(),
      monthIndex = date.getMonth();

  return `${day}.${monthNames[monthIndex]}`;
};

const calculateDays = ( noDays ) => {
  let date =  new Date();
  date.setDate(date.getDate() - noDays);

  let dateConvert = new Date(date)
  return dateConvert.yyyymmdd(date);
};

const resultDate = ( days = 0 ) => {

  let resultDate = calculateDays(days);
  return resultDate;
}

const resultUrl = (numberDays, typeMoney) => {
  console.log('typeMoney', typeMoney);
  resultDate(numberDays);
  let path = `https://api.coindesk.com/v1/bpi/historical/close.json?index=${typeMoney}&start=${resultDate(numberDays)}&end=${resultDate()}`;
  return path;
}

const buildInfo = (numberDays, typeMoney) => {

  Services(res => {
    console.log(res);

    let e = JSON.parse( "[" + res + "]" );

    let keys = Object.keys( e[0]["bpi"]);

    let obj =  e[0]["bpi"];
    let result = Object.keys(obj).map((key) => {
      return [key, obj[key]];
    });


    let labels = [], datas = [];

    result.map( (key , index) => {
      let tempDate = formatDate(new Date(key[0]));
      labels.push(tempDate);
      datas.push(key[1])
    });


  }, resultUrl(numberDays, typeMoney));
};

const returnInfo = (numberDays, typeMoney) => {
 let data = {};

  Services(res => {
    
    let labels = [], datas = [],

        e = JSON.parse( "[" + res + "]" ),

        keys = Object.keys( e[0]["bpi"]),

        obj =  e[0]["bpi"],

        result = Object.keys(obj).map((key) => {
          return [key, obj[key]];
    });

    result.map( (key , index) => {
      let tempDate = formatDate(new Date(key[0]));
      labels.push(tempDate);
      datas.push(key[1])
    });

    data = {
      labels: labels,
      datasets: [
        {
          label: "",
          fill: false,
          lineTension: 0,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 1,
          pointRadius: 1,
          pointHitRadius: 2,
          data: datas
        }
      ]
    };
    
    return data;

  }, resultUrl(numberDays, typeMoney));
  
};

export const Graphic = ({ numberDays, typeMoney }) => {

  
      <div><Line data={
        returnInfo(numberDays, typeMoney)
      } /></div> 
  
};

Graphic.defaultProps = {
  numberDays: 7,
  typeMoney: 'USD'
}