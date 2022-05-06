import * as React from 'react';
import {Unit} from '../Contexts/UnitContext';
import {User} from '../Contexts/UserContext';
import Unitcard from '../Components/Unitcard/Unitcard.jsx';
import Createunit from '../Components/Unitcard/Createunit.jsx';


const Units = () => {
    const {states:UnitStates} = React.useContext(Unit);
    const {states:UserStates} = React.useContext(User);
    const [popup, setPopup] = React.useState(false);
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
            {
                UserStates.user.user_type==="instructor" &&
                <button className="tab-button" onClick={() => {
                    setPopup(true);
                }
                }>
                    Create Units
                </button>
            }
            {
                popup &&
                    <Createunit setPopup={setPopup}/>
            }
        </div>
    )
}
export default Units;