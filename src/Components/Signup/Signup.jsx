import * as React from 'react';
import {User} from '../../Contexts/UserContext';
import {Load} from '../../Contexts/LoadContext';

const Signup = (props) => {
    const {actions} = React.useContext(User);
    const {states:LoadStates} = React.useContext(Load);
    return (
        <div>
            {LoadStates.loading && <div>Loading...</div>}
            <h1>Signup</h1>
            <form onSubmit={
                (e) => {
                    e.preventDefault();
                    actions.setNewUser({
                        user_email: e.target.email.value,
                        user_password: e.target.password.value,
                        user_name: e.target.username.value,
                        user_type: e.target.usertype.value,
                        user_bio: e.target.bio.value
                    });
                }}>
                <input type="text" name="username" placeholder="Username" />
                <input type="text" name="email" placeholder="Email" />
                <input type="password" name="password" placeholder="Password" />
                <input type="password" name="passwordConfirm" placeholder="Confirm Password" />
                <textarea type="text" name="bio" placeholder="Tell us about yourself!"></textarea>
                <input type="radio" name="usertype" value="student" /> Student
                <input type="radio" name="usertype" value="instructor" /> Instructor
                <input type="submit" value="Signup" />
            </form>
        </div>
    );
}
export default Signup;
