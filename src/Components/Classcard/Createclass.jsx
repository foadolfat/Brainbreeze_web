import * as React from 'react';
import {Class} from '../../Contexts/ClassContext';


const Createclass = ({setFullMenuVisible, fullMenuVisible}) => {
    const {actions:ClassActions} = React.useContext(Class);

    return(
        <div>
            <h2>Create Class</h2>
            <form onSubmit={(e)=>{
                e.preventDefault();
                ClassActions.setCreateClassData({
                    class_name: e.target.class_name.value,
                    class_descrip: e.target.class_descrip.value
                });
                setFullMenuVisible(!fullMenuVisible)
            }}>
                <label>Class Name</label>
                <input type="text" name="class_name" placeholder="Class Name" required/>
                <label>Class Description</label>
                <textarea name="class_descrip" placeholder="Class Description" required></textarea>
                <input type="submit" ></input>
            </form>
        </div>
    )
}
export default Createclass;