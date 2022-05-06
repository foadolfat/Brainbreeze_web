import * as React from 'react';
import {Nav} from '../Contexts/NavContext';
import {User} from '../Contexts/UserContext';
import Usercard from '../Components/Usercard/Usercard';

const Profile = () => {
    const {states:NavStates} = React.useContext(Nav);
    const {states:UserStates} = React.useContext(User);
    return(
        <div>
            { NavStates.nav==="profile" &&
                <div>
                    <h1>Profile</h1>
                    {
                        UserStates.user.auth  &&
                        <Usercard />
                    }
                </div>
            }
        </div>
    )
}
export default Profile;