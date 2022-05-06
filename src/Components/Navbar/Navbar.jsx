import * as React from 'react';
import {Load} from '../../Contexts/LoadContext';
import {Nav} from '../../Contexts/NavContext';
import {User} from '../../Contexts/UserContext';
import "./Navbar.css";

const Navbar = () => {
    const {states:LoadStates} = React.useContext(Load);
    const {actions:NavActions} = React.useContext(Nav);
    const {actions:UserActions, states:UserStates} = React.useContext(User);
    return(
        <div className="bar">
            <div className="bar">
                <button className="tab-button" onClick={() => NavActions.setNav("landing")}>Landing</button>
                {LoadStates.loading && <div>Loading...</div>}
            </div>
            <div>
                {UserStates.user.auth &&
                    <div className="tabs">
                        <div className="bar">
                            <button className="tab-button" onClick={() => NavActions.setNav("search")}>Search</button>
                            <button className="tab-button" onClick={() => NavActions.setNav("classes")}>Classes</button>
                            <button className="tab-button" onClick={() => NavActions.setNav("profile")}>Profile</button>
                            <button className="tab-button" onClick={() => {
                                UserActions.setLoggedout(true);
                            }}>Logout</button>
                        </div>
                    </div>
                }
            </div>
            
        </div>
    )
}
export default Navbar;