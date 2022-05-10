import * as React from 'react';
import {User} from '../../Contexts/UserContext';
import {Load} from '../../Contexts/LoadContext';
import "./Signup.css";
import "../../App.css";

const Signup = (props) => {
    const {actions} = React.useContext(User);
    const {states:LoadStates} = React.useContext(Load);
    return (
        <div className="signup">
            {LoadStates.loading && <div>Loading...</div>}
            <h1>Signup</h1>
            <form onSubmit={
                (e) => {
                    e.preventDefault();
                    if(e.target.password.value === e.target.passwordConfirm.value){
                        actions.setNewUser({
                            user_email: e.target.email.value,
                            user_password: e.target.password.value,
                            user_name: e.target.username.value,
                            user_type: e.target.usertype.value,
                            user_bio: e.target.bio.value
                        });
                    } else {
                        alert("Passwords do not match");
                    }
                }}>
                <input className="searchbar" type="text" name="username" placeholder="Username" />
                <input className="searchbar" type="email" name="email" placeholder="Email" />
                <input className="searchbar" type="password" name="password" placeholder="Password" />
                <input className="searchbar" type="password" name="passwordConfirm" placeholder="Confirm Password" />
                <textarea className="textarea" type="text" name="bio" placeholder="Tell us about yourself!"></textarea>
                <div>
                    <input className="searchbar" type="radio" name="usertype" value="student" /> Student
                    <input className="searchbar" type="radio" name="usertype" value="instructor" /> Instructor
                </div>
                <input className="tab-button" type="submit" value="Signup" />
            </form>
        </div>
    );
}
export default Signup;
