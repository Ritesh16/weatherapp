import React from 'react';
import './App.css';
import CityList from './components/CityList';
import AddCity from './components/AddCity';
import {URL} from './constants';

class App extends React.Component {
  constructor(){
    super();
      
    this.state = {
      cities: [],
      city:'',
      status:false
    };
  }

  onCityChange = (event) => {
    this.setState({city: event.target.value})
  }


  onAddCityClick = () => {
    if(this.state.city) {
      var citiesUrl = `${URL}cities`;
      fetch(citiesUrl, {
        method: 'post',
        headers: { 'Content-Type':'application/json' },
        body: JSON.stringify({
        city: this.state.city,
      })
     })
     .then(response => {
       if(response.status === 200) {
          this.status = true;
       }
       else{
         this.status = false;
       }

        return response.json();
     })
     .then(data => {  
      if(this.status === true){
          this.setState({cities:data});
        }
        else{
          alert(data.error);
          this.setState({cities:data.cities});
        }
     })
     .catch(err => {
       alert('Some error has occured');
     });
    }
    else{
      alert('Please provide the city.');
    }
    
}

  componentDidMount(){
    var citiesUrl = `${URL}cities`;
    fetch(citiesUrl)
        .then(response => response.json())
        .then(data => {
           this.setState({cities: data})
        });
  }

  render(){
    return (
      <div>
        <div className='tc'>
          <h1 className='f1'>Weather Today</h1>
          <AddCity onCityChange={this.onCityChange} onAddCityClick={this.onAddCityClick} />
          <CityList cities={this.state.cities} />
        </div>
      </div>
    );
  }

}

export default App;
