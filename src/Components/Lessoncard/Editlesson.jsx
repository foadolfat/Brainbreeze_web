import * as React from 'react';
import {Lesson} from '../../Contexts/LessonContext';
import {editLesson} from '../../Services/LessonAPI.js';
import {Error} from '../../Contexts/ErrorContext';
import {Load} from '../../Contexts/LoadContext';

const Editlesson = ({setFullMenuVisible, fullMenuVisible}) => {
    const {states:LessonStates} = React.useContext(Lesson);
    const {actions:errorActions} = React.useContext(Error);
    const {actions:loadActions} = React.useContext(Load);

    const editLessonFunc = (editLessonData) => {
        loadActions.setLoading(true);
        editLesson(editLessonData)
        .then((res) => {
            if(res.error) {
                errorActions.setError(res.error);
                loadActions.setLoading(false);
            }
        });
        loadActions.setLoading(false);
    }

    return(
        <div>
            <h2>Edit Class</h2>
            <form onSubmit={(e)=>{
                e.preventDefault();
                editLessonFunc({
                    "lesson_name": e.target.lesson_name.value,
                    "lesson_descrip": e.target.lesson_descrip.value,
                    "module_id": LessonStates.currentLesson.module_id,
                    "lesson_id": LessonStates.currentLesson.lesson_id
                });
                setFullMenuVisible(false)
            }}>
                <label>Lesson Name</label>
                <input type="text" name="lesson_name" placeholder="Lesson Name" defaultValue={LessonStates.currentLesson.lesson_name} required/>
                <label>Lesson Description</label>
                <textarea name="lesson_descrip" placeholder="Lesson Description" defaultValue={LessonStates.currentLesson.leson_descrip}  required></textarea>
                <input type="submit" ></input>
            </form>
            <button
                onClick={() => setFullMenuVisible(false)}
              >
                Close
            </button>
        </div>
    )
}
export default Editlesson;