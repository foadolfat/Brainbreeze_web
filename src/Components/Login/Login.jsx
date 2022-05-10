import * as React from 'react';
import {User} from '../../Contexts/UserContext';
import {Load} from '../../Contexts/LoadContext';
import "./Login.css";
import "../../App.css";

const Login = (props) => {
    const {actions} = React.useContext(User);
    const {states:LoadStates} = React.useContext(Load);
    return (
        <div className="login">
            {LoadStates.loading && <div>Loading...</div>}
            <h1>Login</h1>
            <form onSubmit={
                (e) => {
                    e.preventDefault();
                    actions.setLogin({
                        email: e.target.email.value,
                        password: e.target.password.value
                    });
                }
            }>
                <input className="searchbar" type="email" name="email" placeholder="Email" required/>
                <input className="searchbar" type="password" name="password" placeholder="Password" required/>
                <input className="tab-button" type="submit" value="Login" />
            </form>
        </div>
    );
}

export default Login;