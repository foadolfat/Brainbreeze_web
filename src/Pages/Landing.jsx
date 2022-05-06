import * as React from 'react';
import {Nav} from '../Contexts/NavContext';
import {User} from '../Contexts/UserContext';
import Login from '../Components/Login/Login';
import Signup from '../Components/Signup/Signup';

const Landing = () => {
    const {states:NavStates} = React.useContext(Nav);
    const {states:UserStates} = React.useContext(User);
    return(
        <div>
            { NavStates.nav==="landing" &&
                <div>
                    <h1>Landing</h1>
                    <div>
                        {
                            !UserStates.user.auth ? 
                            <div>
                                <Login />
                                <Signup />
                            </div>
                            :
                            <div>
                                Welcome!
                            </div>
                        }
                    </div>
                </div>
            }
        </div>
    )
}
export default Landing;