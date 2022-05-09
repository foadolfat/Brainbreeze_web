import * as React from 'react';
import {Lesson} from '../Contexts/LessonContext';
import {User} from '../Contexts/UserContext';
import Lessoncard from '../Components/Lessoncard/Lessoncard.jsx';
import Modal from '../Components/Modal/Modal';

const Lessons = () => {
    const {states:LessonStates, actions:LessonActions} = React.useContext(Lesson);
    const {states:UserStates} = React.useContext(User);
    

    return(
        <div>
            <h2>Lessons</h2>
            {
                Array.isArray(LessonStates.lessonData) ?
                    LessonStates.lessonData.map((data,index)=>{
                        data.lesson_delete = LessonActions.deleteLessonFunc;
                        return <Lessoncard key={index} data={data}/>
                    })
                    :
                    <p>No lessons found</p>
            }
            { UserStates.user.user_type==="instructor" &&
                    <Modal mode={"lesson"}/>
            }
        </div>
    )
}
export default Lessons;