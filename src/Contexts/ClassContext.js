import * as React from 'react';
import {findByUser, findByName, signUp, createClass, deleteClass, editClass} from '../Services/ClassAPI.js';
import {Error} from './ErrorContext';
import {Load} from './LoadContext';
import {Nav} from './NavContext';
import {User} from './UserContext';

export const Class = React.createContext();

const ClassContext = ({children}) => {
    const {actions:errorActions} = React.useContext(Error);
    const {actions:loadActions} = React.useContext(Load);
    const {states:navStates} = React.useContext(Nav);
    const {states:userStates} = React.useContext(User);
    const setLoading = loadActions.setLoading;
    const setError = errorActions.setError;
    const [classData, setClassData] = React.useState(null);
    const [active, setActive] = React.useState("");
    const [class_name, setClassName] = React.useState("");
    const [listOfClasses, setListOfClasses] = React.useState([]);
    const [signUpClassId, setSignUpClassId] = React.useState("");
    const [createClassData, setCreateClassData] = React.useState(null);
    const [editClassData, setEditClassData] = React.useState(null);
    const [currentClass, setCurrentClass] = React.useState(null);

    const editClassFunc = (editClassData) => {
        setLoading(true);
        editClass(editClassData)
        .then((returnedClassData) => {
            if(returnedClassData.error) {
                setError(returnedClassData.error);
                setLoading(false);
            }
        });
        setLoading(false);
    }

    const deleteClassFunc = (class_id) => {
        setLoading(true);
        deleteClass(class_id)
        .then((returnedClassData) => {
            if(returnedClassData.error) {
                setError(returnedClassData.error);
                setLoading(false);
            }
        });
        setLoading(false);
    }

    React.useEffect(() => {
        if(editClassData){
            setLoading(true);
            editClass(editClassData)
            .then((returnedClassData) => {
                if(returnedClassData.error) {
                    setError(returnedClassData.error);
                    setLoading(false);
                }
            });
            setLoading(false);
        }
        // eslint-disable-next-line
    }, [editClassData])
    React.useEffect(() => {
        if(userStates.user.auth) setClassData(null)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userStates.user.auth]);

    React.useEffect(() => {
        const storage = localStorage.getItem("class");
        if(storage){
            const parsedStorage = JSON.parse(storage);
            setClassData(parsedStorage);
        }
    } , []);

    React.useEffect(() => {
        if(createClassData){
            setLoading(true);
            createClass(createClassData).then(classData => {
                localStorage.setItem('class', JSON.stringify(classData));
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
    }, [createClassData]);

    React.useEffect(() => {
        // CHECK THIS, THERE MIGHT BE AN ISSUE WITH CLASSES REFRESHING PROPERLY
        if(userStates.user.auth){
            const storage = localStorage.getItem("user");
            let user = JSON.parse(storage);
            if(user){
                setLoading(true);
                findByUser(parseInt(user.user_id)).then(classData => {
                    setClassData(classData);
                })
                .catch(err => {
                    setError(err);
                }).finally(() => {
                    setLoading(false);
                });
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    } , [navStates.nav]);

    React.useEffect(() => {
        if(class_name){
            setLoading(true);
            findByName(class_name).then(classData => {
                localStorage.setItem('class', JSON.stringify(classData));
                setListOfClasses(classData);
            }
            ).catch(err => {
                setError(err);
            }).finally(() => {
                setLoading(false);
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [class_name]);

    React.useEffect(() => {
        if(signUpClassId){
            setLoading(true);
            signUp(signUpClassId).then(res => {
                if(res.status===200){
                }
                else{
                    setError(res.message);
                }
            }
            ).catch(err => {
                setError(err);
            }
            ).finally(() => {
                setLoading(false);
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [signUpClassId]);

    return (
        <Class.Provider value={{
            states: {
                classData: classData,
                active: active,
                class_name: class_name,
                listOfClasses: listOfClasses,
                signUpClassId: signUpClassId,
                createClassData: createClassData,
                editClassData: editClassData,
                currentClass: currentClass
            },
            actions: {
                setClassData: setClassData,
                setActive: setActive,
                setClassName: setClassName,
                setListOfClasses: setListOfClasses,
                setSignUpClassId: setSignUpClassId,
                setCreateClassData: setCreateClassData,
                deleteClassFunc: deleteClassFunc,
                editClassFunc: editClassFunc,
                setEditClassData: setEditClassData,
                setCurrentClass: setCurrentClass
            }
        }}>
            {children}
        </Class.Provider>
    );
}
export default ClassContext;