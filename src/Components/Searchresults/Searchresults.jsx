import * as React from 'react';
import {Class} from '../../Contexts/ClassContext';
import {User} from '../../Contexts/UserContext';
import "./Searchresults.css";

const Searchresults = (props) => {
    const {actions:ClassActions} = React.useContext(Class);
    const {states:UserStates} = React.useContext(User);

    return(
        <div className="searchresult">
            {props.data &&
                <div>
                    <h1>
                        {props.data.class_name}
                    </h1>
                    <p>
                        {props.data.class_descrip}
                    </p>
                    <p>
                        {props.data.instructor_name}
                    </p>
                    {UserStates.user.user_type==="student" &&
                        <button onClick={() => {
                            ClassActions.setSignUpClassId(props.data.class_id);
                        }}>
                            Join
                        </button>
                    }
                </div>
            }
        </div>
    )
}
export default Searchresults;