import * as React from 'react';
import {User} from '../../Contexts/UserContext';
import {Load} from '../../Contexts/LoadContext';

const Usercard = () => {
    const {states:UserStates} = React.useContext(User);
    const {states:LoadStates} = React.useContext(Load);
    return (
        <div>
            {LoadStates.loading && <div>Loading...</div>}
            {UserStates.user && <div>
                <h2>{UserStates.user.user_name}</h2>
                <h3>{UserStates.user.user_email}</h3>
                <h3>{UserStates.user.user_type}</h3>
                <h3>{UserStates.user.user_bio && UserStates.user.user_bio}</h3>
            </div>}
        </div>
    )
}
export default Usercard;