import * as React from 'react';
import {Class} from '../Contexts/ClassContext';
import {User} from '../Contexts/UserContext';
import Classcard from '../Components/Classcard/Classcard';
import Createclass from '../Components/Classcard/Createclass';

const Classes = () => {
    const {states:ClassStates} = React.useContext(Class);
    const {states:UserStates} = React.useContext(User);
    const [popup, setPopup] = React.useState(false);

    return(
        <div>
            <h2>Classes</h2>
            {Array.isArray(ClassStates.classData) ?
                ClassStates.classData.map((data,index)=>{
                    return <Classcard key={index} data={data}/>
                })
                :
                <p>No classes found{popup}</p>
            }
            {
                UserStates.user.user_type==="instructor" &&
                <button className="tab-button" onClick={() => {
                    setPopup(true);
                }
                }>
                    Create Class
                </button>
            }
            {
                popup &&
                    <Createclass setPopup={setPopup}/>
            }
        </div>
    )
}
export default Classes;