import * as React from 'react';
import {Class} from '../Contexts/ClassContext';
import {User} from '../Contexts/UserContext';
import Classcard from '../Components/Classcard/Classcard';
import Modal from '../Components/Modal/Modal';

const Classes = () => {
    const {states:ClassStates, actions: ClassActions} = React.useContext(Class);
    const {states:UserStates} = React.useContext(User);

    return(
        <div>
            <h2>Classes</h2>
            {Array.isArray(ClassStates.classData) ?
                ClassStates.classData.map((data,index)=>{
                    data.class_delete = ClassActions.deleteClassFunc;
                    data.class_edit = ClassActions.editClassFunc;
                    return <Classcard key={index} data={data}/>
                })
                :
                <p>No classes found</p>
            }
            { UserStates.user.user_type==="instructor" &&
                    <Modal mode={"class"}/>
            }
        </div>
    )
}
export default Classes;