import * as React from 'react';
// import {Nav} from '../Contexts/NavContext';
import {Unit} from '../Contexts/UnitContext';
import Unitcard from '../Components/Unitcard/Unitcard.jsx';


const Units = () => {
    // const {states:NavStates} = React.useContext(Nav);
    const {states:UnitStates} = React.useContext(Unit);
    return(
        <div>
            <h2>Units</h2>
            {
                Array.isArray(UnitStates.unitData) ?
                    UnitStates.unitData.map((data,index)=>{
                        return <Unitcard key={index} data={data}/>
                    })
                    :
                    <p>No units found</p>
            }
        </div>
    )
}
export default Units;