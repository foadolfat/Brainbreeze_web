import * as React from 'react';
import {Unit} from '../Contexts/UnitContext';
import {User} from '../Contexts/UserContext';
import Unitcard from '../Components/Unitcard/Unitcard.jsx';
import Modal from '../Components/Modal/Modal';


const Units = () => {
    const {states:UnitStates, actions:UnitActions} = React.useContext(Unit);
    const {states:UserStates} = React.useContext(User);
    return(
        <div>
            <h2>Units</h2>
            {
                Array.isArray(UnitStates.unitData) ?
                    UnitStates.unitData.map((data,index)=>{
                        data.unit_delete = UnitActions.deleteUnitFunc;
                        return <Unitcard key={index} data={data}/>
                    })
                    :
                    <p>No units found</p>
            }
            { UserStates.user.user_type==="instructor" &&
                    <Modal mode={"unit"}/>
            }
        </div>
    )
}
export default Units;