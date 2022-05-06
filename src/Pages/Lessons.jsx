import * as React from 'react';
import {Lesson} from '../Contexts/LessonContext';
import Lessoncard from '../Components/Lessoncard/Lessoncard.jsx';

const Lessons = () => {
    const {states:LessonStates} = React.useContext(Lesson);
    

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
        </div>
    )
}
export default Lessons;