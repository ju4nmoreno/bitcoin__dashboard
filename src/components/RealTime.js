import React, { Component } from 'react'
import { Services } from './Services'
//import { LineChart } from 'react-d3-basic'


export class RealTime extends Component {
  constructor() {
    super();
   
    this.state = {
      name: "",
      isLoading: true,
    }

    this.fill();
  }

  fill(){
    const pathService = 'https://api.coindesk.com/v1/bpi/currentprice.json';

    Services(e => {

      let obj = JSON.parse(e);

      this.setState({
        isLoading: false,
        name: obj.chartName,
        price:[
          {
            code: obj.bpi.USD.code,
            price: obj.bpi.USD.rate_float,
            symbol: obj.bpi.USD.symbol
          },
          {
            code: obj.bpi.GBP.code,
            price: obj.bpi.GBP.rate_float,
            symbol: obj.bpi.GBP.symbol
          },
          {
            code: obj.bpi.EUR.code,
            price: obj.bpi.EUR.rate_float,
            symbol: obj.bpi.EUR.symbol
          }
        ]
      });
    }, pathService);

  }
  html(path){
    return { __html: this.state.price[path].symbol + this.state.price[path].price}
  }
 
  render(){
    if(this.state.isLoading){
      return(
        <div>loading...</div>
      )
    }

    return (
       <div className="RealTime">

          <header className="RealTime__header">
            <h2>Real Time</h2>
          </header>

          
          <div className="RealTime__result">

            <div className="RealTime__row">
              <span className="RealTime__Name">{this.state.name} (24h)</span>
            </div>

            <div className="RealTime__row">
              <span className="RealTime__price">USD</span>  
              <span className="RealTime__porcent">-0.9%</span>
            </div>

            {this.state.price.map( (ele, index) => (
              <div key={index} className="RealTime__row">
                {index === 0 ? 
                  <span className="RealTime__cost RealTime__cost--big" dangerouslySetInnerHTML={this.html(index)} /> 
                  :
                  <div className="RealTime__group">
                    <span className="RealTime__nameMoney">{this.state.price[index].code}</span>
                    <span className="RealTime__cost" dangerouslySetInnerHTML={this.html(index)} /> 
                  </div>
                }
              </div>
            ))}

          </div>

          <div className="RealTime__graphic">

            
          </div>
      </div>

    )
    
  }
}