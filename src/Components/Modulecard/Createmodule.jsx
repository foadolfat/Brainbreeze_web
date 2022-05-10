import * as React from 'react';
import {Module} from '../../Contexts/ModuleContext';
import {User} from '../../Contexts/UserContext';
import {Nav} from '../../Contexts/NavContext';

const Createmodule = ({setFullMenuVisible, fullMenuVisible}) => {
    const {actions:ModuleActions} = React.useContext(Module);
    const {states:UserStates} = React.useContext(User);
    const {states:NavStates} = React.useContext(Nav);
    return(
        <div>
            <h2>Create Module</h2>
            <form onSubmit={(e)=>{
                e.preventDefault();
                ModuleActions.setCreateModuleData({
                    module_name: e.target.module_name.value,
                    module_descrip: e.target.module_descrip.value,
                    class_id: NavStates.currentClass,
                    instructor_id: UserStates.user.user_id
                });
                setFullMenuVisible(false)
            }}>
                <label>Module Name</label>
                <input type="text" name="module_name" placeholder="Module Name" required/>
                <label>Module Description</label>
                <textarea name="module_descrip" placeholder="Module Description" required></textarea>
                <input type="submit" ></input>
            </form>
        </div>
    )
}
export default Createmodule;