import * as React from 'react';
import {Unit} from '../../Contexts/UnitContext';
import {User} from '../../Contexts/UserContext';
import {Nav} from '../../Contexts/NavContext';

const Createunit = ({setFullMenuVisible, fullMenuVisible}) => {
    const {actions:UnitAction} = React.useContext(Unit);
    const {states:UserStates} = React.useContext(User);
    const {states:NavStates} = React.useContext(Nav);
    return(
        <div>
            <h2>Create Unit</h2>
            <form onSubmit={(e)=>{
                e.preventDefault();
                UnitAction.setCreateUnitData({
                    unit_name: e.target.unit_name.value,
                    unit_content: e.target.unit_content.value,
                    lesson_id: NavStates.currentLesson,
                    unit_content_type: e.target.unit_content_type.value,
                    instructor_id: UserStates.user.user_id
                });
                setFullMenuVisible(!fullMenuVisible)
            }}>

                <label>Unit Name</label>
                <input type="text" name="unit_name" placeholder="Unit Name" required/>
                <label>Unit Type</label>
                <input type="text" name="unit_content_type" placeholder="Unit Content Type" required/>
                <label>Unit Content</label>
                <textarea name="unit_content" placeholder="Unit Content" required></textarea>
                <input type="submit" ></input>
            </form>
        </div>
    )
}
export default Createunit;