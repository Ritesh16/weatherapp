import React from 'react';
import Weather from './Weather';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './city.css';
import {URL} from '../constants';

class City extends React.Component {

    constructor(){
        super();
        this.state={
            view: 'main', 
            weather:{

            }
        };
    }

    onViewChange = (view) => {
        this.setState({view:view});
    }

    getCurrentTime(time){
        var timeArray = time.split(':');
        var date = new Date();

        var utcDateTime = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), parseInt(timeArray[0]), parseInt(timeArray[1])));

        return utcDateTime.toLocaleTimeString();
    }

    componentDidMount(){
        var cityName = this.props.city.split(',');
        var city = cityName[0];
        var state = cityName[1];
        var url = `${URL}Weather/city/${city}/State/${state}`;

        fetch(url)
        .then(response=>response.json())
        .then(weather=> {
            this.setState({ weather: weather})
        });   
    }

   render(){
    const {view, weather } = this.state;
    const {city} = this.props;

        if(weather.data){
            if(view==='main'){
                const data = weather.data[0];

                return(
                    <div  className='tc bg-light-blue dib br3 pa3 ma2 shadow-5 pointer'>
                        <img alt='_photo' src={`https://www.weatherbit.io/static/img/icons/${weather.data[0].weather.icon}.png`} />
                       <div>
                            <h2>{city}</h2>
                            <p>{weather.data[0].weather.description}</p>
                            <p>Temp: {data.temp * 9/5 + 32}°F</p>
                            <p>AQI: {data.aqi}</p>
                            <p>Rain: {data.precip}%</p>
                            <p>Snow: {data.snow}%</p>
                        </div>
                        <Popup trigger={<a className="f6 link dim br-pill ph3 pv2 mb2 dib white bg-dark-blue" href="#0">Details</a>} position="right center">
                        {close => (
                         <div className="modal">
                              <button className="close" onClick={close}>
                                          &times;
                              </button>
                        <div className="header"> {weather.data[0].city_name}, {weather.data[0].state_code} ({weather.data[0].country_code})</div>
                              <div className="content">
                                <p><strong>{data.weather.description}</strong></p>
                                <p>Temp: {data.temp * 9/5 + 32}°F</p>
                                <p>Feels Like: {data.app_temp * 9/5 + 32}°F</p>
                                <p>AQI: {data.aqi}</p>
                                <p>Visibility: {data.vis} KM</p>
                                <p>Rain: {data.precip} mm/hr</p>
                                <p>Snow: {data.snow} mm/hr</p>
                                <p>Humidity: {data.rh}%</p>
                                <p>Clouds: {data.clouds}%</p>
                                <p>Wind Speed: {data.wind_spd}m/s</p>
                                <p>Observed on: {data.ob_time}</p>
                                <p>Wind Direction: {data.wind_cdir_full}</p>
                                <p>Sunrise: {this.getCurrentTime(data.sunrise)}</p>
                                <p>Sunset: {this.getCurrentTime(data.sunset)}</p>
                                <p>Lat: {data.lat}</p>
                                <p>Long: {data.lon}</p>
                                <p>Pressure: {data.pres} mb</p>
                                <p>Sea Level Pressure: {data.slp} mb</p>
                             </div>
                        </div>
                        )}
                        </Popup>
                    </div>
                    );
            }
            else{
                return (<Weather weather={weather} />)
            }
        }
        else{
            return (
            <div className='tc bg-light-blue dib br3 pa3 ma2 grow shadow-5'>
                  Loading......
                 <div>
                    <h2>{city}</h2>
                    <p>Loading......</p>
                 </div>
            </div>  
            );  
        }
   }      
}

export default City;