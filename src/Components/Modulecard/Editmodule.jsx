import * as React from 'react';
import {Module} from '../../Contexts/ModuleContext';
import {editModule} from '../../Services/ModuleAPI.js';
import {Error} from '../../Contexts/ErrorContext';
import {Load} from '../../Contexts/LoadContext';

const Editmodule = ({setFullMenuVisible, fullMenuVisible}) => {
    const {states:ModuleStates} = React.useContext(Module);
    const {actions:errorActions} = React.useContext(Error);
    const {actions:loadActions} = React.useContext(Load);

    const editModuleFunc = (editModuleData) => {
        loadActions.setLoading(true);
        editModule(editModuleData)
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
            <h2>Edit Module</h2>
            <form onSubmit={(e)=>{
                e.preventDefault();
                editModuleFunc({
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