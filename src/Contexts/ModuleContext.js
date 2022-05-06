import * as React from 'react';
import {Error} from './ErrorContext';
import {Load} from './LoadContext';
import {findByClassId, createModule} from '../Services/ModuleAPI';
import {User} from './UserContext';

export const Module = React.createContext();

const ModuleContext = ({children}) => {
    const {actions:errorActions} = React.useContext(Error);
    const {actions:loadActions} = React.useContext(Load);
    const {states:userStates} = React.useContext(User);
    const [classId, setClassId] = React.useState("");
    const setLoading = loadActions.setLoading;
    const setError = errorActions.setError;
    const [moduleData, setModuleData] = React.useState(null);
    const [createModuleData ,setCreateModuleData] = React.useState(null);
    const [reload, setReload] = React.useState(false);

    React.useEffect(() => {
        if(classId){
            setLoading(true);
            findByClassId(classId).then(moduleData => {
                localStorage.setItem('module', JSON.stringify(moduleData));
                setModuleData(moduleData);
            })
            .catch(err => {
                setError(err);
            }).finally(() => {
                setLoading(false);
            });
        }
        // eslint-disable-next-line
    }, [reload]);

    React.useEffect(() => {
        if(createModuleData){
            setLoading(true);
            createModule(createModuleData).then(moduleData => {
                localStorage.setItem('module', JSON.stringify(moduleData));
                setLoading(false);
            })
            .catch(err => {
                setLoading(false);
                setError(err);
            })
            .finally(() => {
                setLoading(false)
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [createModuleData]);

    React.useEffect(() => {
        if(userStates.loggedout) setModuleData(null)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userStates.loggedout]);

    React.useEffect(() => {
        const storage = localStorage.getItem("module");
        if(storage){
            const parsedStorage = JSON.parse(storage);
            setModuleData(parsedStorage);
        }
    } , []);

    React.useEffect(() => {
        if(classId){
            setLoading(true);
            findByClassId(classId).then(moduleData => {
                localStorage.setItem('module', JSON.stringify(moduleData));
                setModuleData(moduleData);
            })
            .catch(err => {
                setError(err);
            }).finally(() => {
                setLoading(false);
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    } , [classId]);

    return(
        <Module.Provider value={{
            states: {
                moduleData: moduleData,
                classId: classId,
                moduleCreateData: createModuleData,
                reload: reload
            },
            actions: {
                setModuleData: setModuleData,
                setClassId: setClassId,
                setCreateModuleData: setCreateModuleData,
                setReload: setReload
            }
        }}>
            {children}
        </Module.Provider>
    );
}
export default ModuleContext;