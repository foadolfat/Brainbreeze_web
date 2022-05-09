import * as React from 'react';
import {Module} from '../../Contexts/ModuleContext';
import {Nav} from '../../Contexts/NavContext';
import {Content} from '../../Contexts/ContentContext.js';
import {Class} from '../../Contexts/ClassContext';
import "./Classcard.css";

const Classcard = (props) => {
    const {actions:ModuleActions} = React.useContext(Module);
    const {actions:ContentActions} = React.useContext(Content);
    const {actions:NavActions, states:NavStates} = React.useContext(Nav);
    const {actions:ClassActions} = React.useContext(Class);
    return(
        <div>
            {props.data &&
                <div>
                    <button className={`${NavStates.currentClass===props.data.class_id ? 'tab-button active-class' : 'tab-button'}`}  onClick={()=>{
                            ModuleActions.setClassId(props.data.class_id);
                            ClassActions.setCurrentClass(props.data);
                            ContentActions.setContent(props.data);
                            NavActions.setNav("modules");
                            NavActions.setCurrentClass(props.data.class_id);
                        }}
                    >{props.data.class_name}</button>
                </div>
            }
        </div>
    )
}
export default Classcard;

