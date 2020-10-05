import React from 'react';
import './App.css';
import CityList from './components/CityList';
import AddCity from './components/AddCity';

class App extends React.Component {
  constructor(){
    super();
      
    this.state = {
      cities: [],
      city:''
    };
  }

  onCityChange = (event) => {
    this.setState({city: event.target.value})
  }


  onAddCityClick = () => {
    fetch('https://vast-sierra-37559.herokuapp.com/cities', {
      method: 'post',
      headers: { 'Content-Type':'application/json' },
      body: JSON.stringify({
        city: this.state.city,
      })
    })
    .then(response => response.json())
    .then(cities => {
        this.setState({cities:cities});
    })
}

  componentDidMount(){
    fetch('https://vast-sierra-37559.herokuapp.com/cities')
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
