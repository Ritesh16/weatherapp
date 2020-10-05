import React from 'react';

class AddCity extends React.Component {

    render(){
        return(
            <div>
                 <input 
                  onChange = {this.props.onCityChange}
                  className='pa2 ba b--green bg-lightest-blue'
                  type='text' 
                  placeholder='Add City(City,State)'
                   />
                   <a onClick={this.props.onAddCityClick} className="f6 link dim ph3 pv2 mb2 dib white bg-dark-blue" href="#0">Add</a>
            </div>
        );
    }
}

export default AddCity;