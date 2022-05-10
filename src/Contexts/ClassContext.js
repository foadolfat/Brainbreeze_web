import * as React from 'react';
import {findByUser, findByName, signUp, createClass, deleteClass, editClass, dropClass} from '../Services/ClassAPI.js';
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

    const dropClassFunction = (class_id) => {
        dropClass(class_id).then((returnedClassData) => {
            if(returnedClassData.error) {
                setError(returnedClassData.error);
                setLoading(false);
            }
        }).then(() => {
            setLoading(true);
            findByUser(parseInt(userStates.user.user_id)).then(classData => {
                localStorage.setItem('class', JSON.stringify(classData));
                setClassData(classData);
            }).catch(err => {
                setError(err);
            }
            ).finally(() => {
                setLoading(false);
            }
            );
        });
    }

    const classesNotSignUp = (classes) => {
        if(classData.length){let myClasses = classData.map(a => a.class_id);
        let result = classes.filter(class_ => {
            return myClasses.includes(class_.class_id) ? false : true;
        })
        return result}
        else return classes;
    }

    const returnUniqueClasses = (classes) => {
        const uniqueIds = new Set();

        const unique = classes.filter(element => {
            const isDuplicate = uniqueIds.has(element.class_id);

            uniqueIds.add(element.class_id);

            if (!isDuplicate) {
                return true;
            }

            return false;
        });

        return unique;
    }

    const searchForClasses = async (class_name) => {
        setLoading(true);
        findByName(class_name).then(classData => {
            let unique = returnUniqueClasses(classData)
            let result = classesNotSignUp(unique)
            localStorage.setItem('class', JSON.stringify(result));
            setListOfClasses(result);
        }
        ).catch(err => {
            setError(err);
        }).finally(() => {
            setLoading(false);
        });
    }

    const editClassFunc = (editClassData) => {
        setLoading(true);
        editClass(editClassData)
        .then((returnedClassData) => {
            if(returnedClassData.error) {
                setError(returnedClassData.error);
                setLoading(false);
            }
        }).then(() => {
            if(userStates.user){
                setLoading(true);
                findByUser(parseInt(userStates.user.user_id)).then(classData => {
                    setClassData(classData);
                })
                .catch(err => {
                    setError(err);
                }).finally(() => {
                    setLoading(false);
                });
            }
        })
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
        }).then(() => {
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
        })
        setLoading(false);
    }

    React.useEffect(() => {
        if(editClassData){
            setLoading(true);
            editClass(editClassData)
            .then((returnedClassData) => {
                setLoading(true);
                findByUser(parseInt(userStates.user.user_id)).then(classData => {
                    console.log(classData);
                    setClassData(classData);
                })
                .catch(err => {
                    setError(err);
                }).finally(() => {
                    setLoading(false);
                });
                if(returnedClassData.error) {
                    setError(returnedClassData.error);
                    setLoading(false);
                }
            }).finally(() => {
                setLoading(true);
                findByUser(parseInt(userStates.user.user_id)).then(classData => {
                    console.log(classData);
                    setClassData(classData);
                })
                .catch(err => {
                    setError(err);
                }).finally(() => {
                    setLoading(false);
                });
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
                setLoading(false)
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [createClassData]);

    React.useEffect(() => {
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
                setCurrentClass: setCurrentClass,
                searchForClasses: searchForClasses,
                dropClassFunction: dropClassFunction
            }
        }}>
            {children}
        </Class.Provider>
    );
}
export default ClassContext;