import * as React from 'react';
import {Nav} from '../../Contexts/NavContext';
import {Lesson} from '../../Contexts/LessonContext';
import {Content} from '../../Contexts/ContentContext.js';
import {Module} from '../../Contexts/ModuleContext';
import "./Modulecard.css";

const Modulecard = (props) => {
    const {actions:LessonActions} = React.useContext(Lesson);
    const {actions:ContentActions} = React.useContext(Content);
    const {actions:NavActions, states:NavStates} = React.useContext(Nav);
    const {actions:ModuleActions} = React.useContext(Module);

    return(
        <div>
            {props.data &&
                <div>
                    <button className={`${NavStates.currentModule===props.data.module_id ? 'tab-button active-module' : 'tab-button'}`} onClick={()=>{
                            LessonActions.setModuleId(props.data.module_id);
                            ContentActions.setContent(props.data);
                            ModuleActions.setCurrentModule(props.data);
                            NavActions.setNav("lessons");
                            NavActions.setCurrentModule(props.data.module_id);
                        }}
                    >{props.data.module_name}</button>
                </div>
            }
        </div>
    )
}
export default Modulecard;