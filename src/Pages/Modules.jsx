import * as React from 'react';
import {Module} from '../Contexts/ModuleContext';
import {User} from '../Contexts/UserContext';
import Modulecard from '../Components/Modulecard/Modulecard';
import Createmodule from '../Components/Modulecard/Createmodule';

const Modules = () => {
    const {states:ModuleStates, actions:ModuleActions} = React.useContext(Module);
    const {states:UserStates} = React.useContext(User);
    const [popup, setPopup] = React.useState(false);
    const [loaded, setLoaded] = React.useState(false);

    React.useEffect(()=>{
        setLoaded(false)
        !popup && ModuleActions.setReload(!(ModuleStates.reload));
        setLoaded(true)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [popup])
    return(
        <div>
            <h2>Modules</h2>
            {loaded && Array.isArray(ModuleStates.moduleData) ?
                ModuleStates.moduleData.map((data,index)=>{
                    return <Modulecard key={index} data={data}/>
                })
                :
                <p>No modules found</p>
            }
            {
                UserStates.user.user_type==="instructor" &&
                <button className="tab-button" onClick={() => {
                    setPopup(true);
                }
                }>
                    Create Module
                </button>
            }
            {
                popup &&
                    <Createmodule setPopup={setPopup}/>
            }
        </div>
    )
}
export default Modules;