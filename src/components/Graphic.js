import React, { Component } from 'react'
import {Line} from 'react-chartjs-2'

const formatDate = (date) => {
  const montNames =[
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ]
  
  let day = date.getDate();
  let mouthIndex = date.getMonth();

  return `${day}.${monthNames[monthIndex]}`;
};


export const Graphic = ({ numberDays, typeMoney }) => (
  <div> fear {numberDays=1} {typeMoney='USD'} </div> 
)