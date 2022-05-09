import * as React from 'react';
import {Module} from '../Contexts/ModuleContext';
import {User} from '../Contexts/UserContext';
import Modulecard from '../Components/Modulecard/Modulecard';
import Modal from '../Components/Modal/Modal';

const Modules = () => {
    const {states:ModuleStates, actions:ModuleActions} = React.useContext(Module);
    const {states:UserStates} = React.useContext(User);

    return(
        <div>
            <h2>Modules</h2>
            {Array.isArray(ModuleStates.moduleData) ?
                ModuleStates.moduleData.map((data,index)=>{
                    data.module_delete = ModuleActions.deleteModuleFunc;
                    return <Modulecard key={index} data={data}/>
                })
                :
                <p>No modules found</p>
            }
            { UserStates.user.user_type==="instructor" &&
                    <Modal mode={"module"}/>
            }
        </div>
    )
}
export default Modules;