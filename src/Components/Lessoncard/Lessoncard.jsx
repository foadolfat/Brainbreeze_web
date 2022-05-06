import * as React from 'react';
import {Nav} from '../../Contexts/NavContext';
import {Unit} from '../../Contexts/UnitContext';
import {Content} from '../../Contexts/ContentContext.js';
// import {Progress} from '../../Contexts/ProgressContext';
import "./Lessoncard.css";

const Lessoncard = (props) => {
    const {actions:NavActions, states:NavStates} = React.useContext(Nav);
    const {actions:ContentActions} = React.useContext(Content);
    const {actions:UnitActions} = React.useContext(Unit);
    // const {states:ProgressStates, actions:ProgressActions} = React.useContext(Progress);

    // React.useEffect(()=>{
    //     ProgressActions.setLessonProgressData(props.data.lesson_id);
    // },[]);

    return(
        <div>
            {props.data &&
                <div>
                    {/* {console.log(ProgressStates)} */}
                    <button className={`${NavStates.currentLesson===JSON.parse(props.data.lesson_id) ? 'tab-button active-lesson' : 'tab-button'}`} onClick={()=>{
                            UnitActions.setLessonId(props.data.lesson_id);
                            ContentActions.setContent(props.data);
                            NavActions.setNav("units");
                            NavActions.setCurrentLesson(props.data.lesson_id);
                        }}
                    >{props.data.lesson_name}</button>
                </div>
            }
        </div>
    )
}
export default Lessoncard;