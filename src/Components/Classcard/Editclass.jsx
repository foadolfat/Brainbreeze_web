import * as React from 'react';
import {Class} from '../../Contexts/ClassContext';
import {editClass} from '../../Services/ClassAPI.js';
import {Error} from '../../Contexts/ErrorContext';
import {Load} from '../../Contexts/LoadContext';

const Editclass = ({setFullMenuVisible, fullMenuVisible}) => {
    const {states:ClassStates} = React.useContext(Class);
    const {actions:errorActions} = React.useContext(Error);
    const {actions:loadActions} = React.useContext(Load);

    const editClassFunc = (editClassData) => {
        loadActions.setLoading(true);
        editClass(editClassData)
        .then((returnedClassData) => {
            if(returnedClassData.error) {
                errorActions.setError(returnedClassData.error);
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
                editClassFunc({
                    "class_name": e.target.class_name.value,
                    "class_descrip": e.target.class_descrip.value,
                    "class_id": ClassStates.currentClass.class_id
                });
                setFullMenuVisible(false)
            }}>
                <label>Class Name</label>
                <input type="text" name="class_name" placeholder="Class Name" defaultValue={ClassStates.currentClass.class_name} required/>
                <label>Class Description</label>
                <textarea name="class_descrip" placeholder="Class Description" defaultValue={ClassStates.currentClass.class_descrip}  required></textarea>
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
export default Editclass;