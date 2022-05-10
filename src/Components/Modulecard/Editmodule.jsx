import * as React from 'react';
import {Module} from '../../Contexts/ModuleContext';

const Editmodule = ({setFullMenuVisible, fullMenuVisible}) => {
    const {states:ModuleStates, actions:ModuleActions} = React.useContext(Module);

    return(
        <div>
            <h2>Edit Module</h2>
            <form onSubmit={(e)=>{
                e.preventDefault();
                ModuleActions.editModuleFunc({
                    "module_name": e.target.module_name.value,
                    "module_descrip": e.target.module_descrip.value,
                    "module_id": ModuleStates.currentModule.module_id,
                    "class_id": ModuleStates.currentModule.class_id
                });
                setFullMenuVisible(false)
            }}>
                <label>Module Name</label>
                <input type="text" name="module_name" placeholder="Module Name" defaultValue={ModuleStates.currentModule.module_name} required/>
                <label>Module Description</label>
                <textarea name="module_descrip" placeholder="Module Description" defaultValue={ModuleStates.currentModule.module_descrip}  required></textarea>
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
export default Editmodule;