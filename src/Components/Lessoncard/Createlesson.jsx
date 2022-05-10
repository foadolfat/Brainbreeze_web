import * as React from 'react';
import {Lesson} from '../../Contexts/LessonContext';
import {User} from '../../Contexts/UserContext';
import {Nav} from '../../Contexts/NavContext';

const Createmodule = ({setFullMenuVisible, fullMenuVisible}) => {
    const {actions:LessonAction} = React.useContext(Lesson);
    const {states:UserStates} = React.useContext(User);
    const {states:NavStates} = React.useContext(Nav);
    return(
        <div>
            <h2>Create Lesson</h2>
            <form onSubmit={(e)=>{
                e.preventDefault();
                LessonAction.setCreateLessonData({
                    lesson_name: e.target.lesson_name.value,
                    lesson_descrip: e.target.lesson_descrip.value,
                    module_id: NavStates.currentModule,
                    lesson_index: e.target.lesson_index.value,
                    instructor_id: UserStates.user.user_id
                });
                setFullMenuVisible(false)
            }}>
                <label>Lesson Name</label>
                <input type="text" name="lesson_name" placeholder="Lesson Name" required/>
                <label>Lesson Index</label>
                <input type="number" name="lesson_index" placeholder="Lesson Index" required/>
                <label>Module Description</label>
                <textarea name="lesson_descrip" placeholder="Lesson Description" required></textarea>
                <input type="submit" ></input>
            </form>
        </div>
    )
}
export default Createmodule;