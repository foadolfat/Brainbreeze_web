import * as React from 'react';
import {User} from '../../Contexts/UserContext';
import {Load} from '../../Contexts/LoadContext';

const Login = () => {
    const {actions} = React.useContext(User);
    const {states:LoadStates} = React.useContext(Load);
    return (
        <div>
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
                <input type="text" name="email" placeholder="Email" required/>
                <input type="password" name="password" placeholder="Password" required/>
                <input type="submit" value="Login" />
            </form>
        </div>
    );
}

export default Login;