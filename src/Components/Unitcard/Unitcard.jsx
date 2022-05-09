import * as React from 'react';
import {Nav} from '../../Contexts/NavContext';
import {Content} from '../../Contexts/ContentContext.js';
import {Quiz} from '../../Contexts/QuizContext';
import {Unit} from '../../Contexts/UnitContext';
import {Error} from '../../Contexts/ErrorContext';
import {User} from '../../Contexts/UserContext';
import {findByUnit} from '../../Services/ProgressAPI.js';
import "./Unitcard.css";

const Unitcard = (props) => {
    const {actions:NavActions, states:NavStates} = React.useContext(Nav);
    const {actions:QuizActions} = React.useContext(Quiz);
    const {actions:ContentActions} = React.useContext(Content);
    const {actions:ErrorActions} = React.useContext(Error);
    const {states:UserStates} = React.useContext(User);
    const {actions:UnitActions} = React.useContext(Unit);
    const [unitProgress, setUnitProgress] = React.useState([]);

    React.useEffect(()=>{
        if(props.data.unit_id && UserStates.user.user_id){
            findByUnit(props.data.unit_id, UserStates.user.user_id).then(progressData => {
                if(progressData.error){
                    ErrorActions.setError(progressData.error);
                }
                else{
                    setUnitProgress(progressData);
                }
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[props.data.unit_id]);
    return(
        <div>
            {props.data &&
                <div>
                    <button className={`${NavStates.currentUnit===props.data.unit_id ? `tab-button active-unit` : `tab-button ${unitProgress.result && unitProgress.result.length ? 'badge' : ''}` }`} onClick={()=>{
                            ContentActions.setContent(props.data);
                            UnitActions.setCurrentUnit(props.data);
                            QuizActions.setUnitId(props.data.unit_id);
                            NavActions.setNav("content");
                            NavActions.setCurrentUnit(props.data.unit_id);
                        }}
                    >{props.data.unit_name}</button>
                </div>
            }
        </div>
    )
}
export default Unitcard;