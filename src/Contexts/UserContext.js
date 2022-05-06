import * as React from 'react';
import {signIn, signUp} from '../Services/Authentication';
import {Load} from './LoadContext';
import {Error} from './ErrorContext';
import {Nav} from './NavContext';

export const User = React.createContext();

const UserContext = ({children}) => {
    const {actions: loadActions} = React.useContext(Load);
    const {actions: errorActions} = React.useContext(Error);
    const {actions: navActions} = React.useContext(Nav);
    const setLoading = loadActions.setLoading;
    const setError = errorActions.setError;
    const [loggedout, setLoggedout] = React.useState(false);
    const [newUser, setNewUser] = React.useState({
        user_name: null,
        user_email: null,
        user_password: null,
        user_type: null,
        user_pp: null,
        user_bio: null
    });
    const [user, setUser] = React.useState({
        auth: false,
        token: null,
        user_email: null,
        user_name: null,
        user_type: null,
        user_id: null,
        user_pp: null,
        user_bio: null
      });
    const [login, setLogin] = React.useState({
        email: null,
        password: null
    });
    const [signUpStatus, setSignUpStatus] = React.useState(false);

    React.useEffect(() => {
        if(loggedout) {
            localStorage.clear();
            navActions.setNav('landing');
            setUser({
                auth: false,
                token: null,
                user_email: null,
                user_name: null,
                user_type: null,
                user_id: null,
                user_pp: null,
                user_bio: null
                });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loggedout]);

    React.useEffect(() => {
        const storage = localStorage.getItem("user");
        if(storage){
            const parsedStorage = JSON.parse(storage);
            setUser(parsedStorage);
        }
    } , []);

    React.useEffect(() => {
        if(newUser.user_email && newUser.user_password && newUser.user_name && newUser.user_type){
            setLoading(true);
            signUp(newUser)
                .then(res => {
                    setSignUpStatus(res.message);
                }
            )
            .catch(err => {
                setError(err);
            }).finally(() => {
                setLoading(false);
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[newUser]);
    
    React.useEffect(() => {
        if(login.email && login.password){
            setLoading(true);
            signIn(login.email, login.password)
                .then(res => {
                    localStorage.setItem('user', JSON.stringify(res));
                    localStorage.setItem('token', JSON.stringify(res.token));
                    setLoggedout(false);
                    setUser(res);
                }
            )
            .catch(err => {
                setError(err);
            }).finally(() => {
                setLoading(false);
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[login]);

    return (
        <User.Provider value={{
            states: {
                newUser: newUser,
                user: user,
                login: login,
                loggedout: loggedout,
                signUpStatus: signUpStatus
            },
            actions: {
                setNewUser: setNewUser,
                setUser: setUser,
                setLogin: setLogin,
                setLoggedout: setLoggedout,
                setSignUp: setSignUpStatus
            }
        }}>
            {children}
        </User.Provider>
    );
}
export default UserContext;


