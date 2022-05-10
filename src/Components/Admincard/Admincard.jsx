import * as React from 'react';
import {deleteUser, deleteClass} from "../../Services/AdminAPI.js";

const Admincard = () => {

    return(
        <div>
            <form onSubmit={(e)=>{
                    e.preventDefault();
                    deleteUser({
                        "user_id": e.target.user_id.value,
                        "user_email": e.target.user_email.value,
                        "password": e.target.password.value
                    });
                }
                }>
                <label>Delete User</label>
                <input type="text" name="user_id" placeholder="User ID to be deleted" required/>
                <label>Admin Email</label>
                <input type="text" name="user_email" placeholder="Admin Email" required/>
                <label>Admin Password</label>
                <input type="text" name="password" placeholder="Admin Password" required/>
                <input type="submit" value="Delete User"></input>
            </form>
            <form onSubmit={(e)=>{
                    e.preventDefault();
                    deleteClass({
                        "user_id": e.target.class_id.value,
                        "user_email": e.target.user_email.value,
                        "password": e.target.password.value
                    });
                }
                }>
                <label>Delete Class</label>
                <input type="text" name="class_id" placeholder="Class ID to be deleted" required/>
                <label>Admin Email</label>
                <input type="text" name="user_email" placeholder="Admin Email" required/>
                <label>Admin Password</label>
                <input type="text" name="password" placeholder="Admin Password" required/>
                <input type="submit" value="Delete Class"></input>
            </form>
        </div>
    )
}
export default Admincard;