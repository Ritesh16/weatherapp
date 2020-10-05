import React from 'react';
import City from './City';

class CityList extends React.Component {
    
    render(){
        return (
            <div>
                {
                    this.props.cities.map(city => {
                        return (
                            <City key={city} city={city} />
                        )
                    })
                }
            </div>
        );
    }
}

export default CityList;