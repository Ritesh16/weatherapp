import React from 'react';
import City from './City';

class CityList extends React.Component {
    
    render(){
        if(this.props.cities.length > 0) {
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
        else {
           return (
               <div>
                   <h2 className="f5 f4-m f3-l fw2 white-50 mt0 lh-copy">No Cities found</h2>
               </div>
                );
            }
    }
}

export default CityList;