import * as React from 'react';
import {Lesson} from '../Contexts/LessonContext';
import {User} from '../Contexts/UserContext';
import Lessoncard from '../Components/Lessoncard/Lessoncard.jsx';
import Createlesson from '../Components/Lessoncard/Createlesson';

const Lessons = () => {
    const {states:LessonStates} = React.useContext(Lesson);
    const {states:UserStates} = React.useContext(User);
    const [popup, setPopup] = React.useState(false);
    

    return(
        <div>
            <h2>Lessons</h2>
            {
                Array.isArray(LessonStates.lessonData) ?
                    LessonStates.lessonData.map((data,index)=>{
                        return <Lessoncard key={index} data={data}/>
                    })
                    :
                    <p>No lessons found</p>
            }
            {
                UserStates.user.user_type==="instructor" &&
                <button className="tab-button" onClick={() => {
                    setPopup(true);
                }
                }>
                    Create Lessons
                </button>
            }
            {
                popup &&
                    <Createlesson setPopup={setPopup}/>
            }
        </div>
    )
}
export default Lessons;