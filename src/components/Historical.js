import React, { Component, PropTypes } from 'react'
import { Services } from './Services'
import { HistoricalGraphic } from './HistoricalGraphic'
import { Line } from 'react-chartjs-2'

export class Historical extends Component {
  constructor() {
    super();

    let nowTemp = new Date();



    this.state = {
      isLoading: true,
      index: "USD", 
      now: nowTemp.yyyymmdd(),
      end: this.addDays(-7)
    };

    //console.log("end", this.state.end)

    this.fill();
  }

  addDays(days){
    let date =  new Date();
    date.setDate(date.getDate() + days);

    let dateConvert = new Date(date)
    return dateConvert.yyyymmdd(date);
  }

  formatDate(date){

    const monthNames = [
      "Jan", "Feb", "Mar",
      "Apr", "May", "Jun", "Jul",
      "Aug", "Sep", "Oct",
      "Nov", "Dec"
    ];

    let day = date.getDate();
    let monthIndex = date.getMonth();

    var date = new Date();
    var d = new Date();

    return `${day}.${monthNames[monthIndex]}`;
  }



  fill(obj = null){

    console.log(this.state)
    
    if (obj !== null) this.setState(obj);

    let pathService = `https://api.coindesk.com/v1/bpi/historical/close.json?index=${this.state.index}&start=${this.state.end}&end=${this.state.now}`;

    if (!this.state.isLoading) {
      this.setState({isLoading: false})
    }


    Services(res => {

      let e = JSON.parse( "[" + res + "]" );

      var keys = Object.keys( e[0]["bpi"]);

      let obj =  e[0]["bpi"];
      var result = Object.keys(obj).map((key) => {
        return [key, obj[key]];
      });


      //console.log("result", result)


      let labels = [], datas = [];

      result.map( (key , index) => {
        let tempDate = this.formatDate(new Date(key[0]));
        labels.push(tempDate);
        datas.push(key[1])
      });
      
      const data = {
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

      this.setState({ 
          isLoading: false,
          data
      });

    }, pathService);
  }
 
  render(){
    if (this.state.isLoading){
      return(
        <div>Loading ....</div>
      )
    }
    return(
      <div className="Historical">
        <header className="Historical__header">
          <h2 className="Historical__title">Bitcoin</h2>
        </header>

        <div className="Historical__nav">

          <div className="Historical__subTitle">Bitcoin</div>

          <div className="Historical__date">
            <input type="date" />
            <label> to </label>
            <input type="date" />
          </div>

          <nav className="Historical__navTime">
            <ul>
              <li><button className="Btn__historical Btn__historical--active" onClick={() => this.fill({end: this.addDays(-7)})} >1w</button></li>
              <li><button className="Btn__historical" onClick={() => this.fill({end: this.addDays(-30)})} >1m</button></li>
              <li><button className="Btn__historical" onClick={() => this.fill({end: this.addDays(-90)})} >3m</button></li>
              <li><button className="Btn__historical" onClick={() => this.fill({end: this.addDays(-357)})} >1y</button></li>
              <li><button className="Btn__historical" onClick={() => this.fill({end: this.addDays(-2555)})} >all</button></li>
            </ul>
          </nav>

          <nav className="Historical__coin" >
            <ul>
              {this.props.coins.map( (ele, index) => (
                <li key={index}>
                  { this.state.index === ele ?

                    <button className="Btn__coin Btn__coin--active" onClick={() => this.fill({index: ele })} > {ele} </button>
                    : 
                    <button className="Btn__coin" onClick={() => this.fill({index: ele })} > {ele} </button>
                  }
                  
                </li>
              ))}
            </ul>
          </nav>
        </div>
        
        <div className="Historical__graphic">
          <Line data={this.state.data} />
        </div>
          
        <div className="Historical__download">
          <button className="Historical__btn">Download Historical Price Data</button>
        </div>
      </div>
    )
  }
}

Historical.defaultProps = {
  coins: ["USD", "CNY", "EUR", "GBP"]
}

Historical.propTypes = {
  coins: PropTypes.array,
}



