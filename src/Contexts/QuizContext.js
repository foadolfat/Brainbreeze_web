import * as React from 'react';
import {Error} from './ErrorContext';
import {Load} from './LoadContext';
import {findByUnitId, findQuizDataByQuizId, createQuiz, editQuiz, createQuizDataAPI, getQuizData, deleteQuizData} from '../Services/QuizAPI';
import {createProgress} from '../Services/ProgressAPI';
import {User} from './UserContext';
import {Nav} from './NavContext';

export const Quiz = React.createContext();

const QuizContext = ({children}) => {
    const {actions:errorActions} = React.useContext(Error);
    const {actions:loadActions} = React.useContext(Load);
    const {states:userStates} = React.useContext(User);
    const {states:navStates} = React.useContext(Nav);
    const [unitId, setUnitId] = React.useState();
    const setLoading = loadActions.setLoading;
    const setError = errorActions.setError;
    const [quizData, setQuizData] = React.useState(null);
    const [createQuizData, setCreateQuizData] = React.useState(null);
    const [currentQuiz, setCurrentQuiz] = React.useState(null);
    const [editQuizData, setEditQuizData] = React.useState(null);
    const [numOfCorrectAnswers, setNumOfCorrectAnswers] = React.useState(1);

    const deleteQuizDataAPI = async (quiz_id, quizData_id) => {
        setLoading(true);
        deleteQuizData(quiz_id, quizData_id)
        .then(data => {
            if(data.error){
                setError(data.error);
            }else{
                console.log(data);
            }
            setLoading(false);
        }).then(() => {
            if(unitId){
                setLoading(true);
                findByUnitId(unitId).then(quiz => {
                    if(quiz.length && quiz[0].quiz_id){
                        setLoading(true);
                        findQuizDataByQuizId(quiz[0].quiz_id).then(quizData => {
                            localStorage.setItem('quiz', JSON.stringify(quizData));
                            setQuizData(quizData);
                        })
                        .catch(err => {
                            setError(err);
                        }).finally(() => {
                            setLoading(false);
                        });
                    }else{
                        setQuizData(null);
                        setLoading(false);
                    }
                })
                .catch(err => {
                    setError(err);
                }).finally(() => {
                    setLoading(false);
                });
            }else{
                setQuizData(null);
                setLoading(false);
            }
        }).catch(err => {
            setError(err);
            setLoading(false);
        });
        setLoading(false);
    }

    const quizProgress = (quiz_id) => {
        setLoading(true);
        getQuizData(quiz_id)
        .then(data => {
            if(numOfCorrectAnswers === data.length && userStates.user.user_type === 'student'){
                createProgress(navStates.currentUnit, userStates.user.user_id)
            }
            setLoading(false);
        }).catch(err => {
            setError(err);
            setLoading(false);
        })
    }

    const createAQuiz = (quizInfo) => {
        setLoading(true);
        createQuiz(quizInfo)
        .then((returnedQuizData) => {
            if(returnedQuizData.error) {
                setError(returnedQuizData.error);
                setLoading(false);
            } else {
                setLoading(false);
            }
        }).finally(()=>{
            findByUnitId(unitId).then(quiz => {
                if(quiz.length && quiz[0].quiz_id){
                    setLoading(true);
                    findQuizDataByQuizId(quiz[0].quiz_id).then(quizData => {
                        localStorage.setItem('quiz', JSON.stringify(quizData));
                        setQuizData(quizData);
                    })
                    .catch(err => {
                        setError(err);
                    }).finally(() => {
                        setLoading(false);
                    });
                }else{
                    setQuizData(null);
                    setLoading(false);
                }
            })
        })
    }

    const createAQuizData = (createQuizData) => {
        setLoading(true);
        findByUnitId(createQuizData.unit_id)
        .then(data => {
            if(data.error){
                console.log(data.error)
                setError(data.error);
                setLoading(false);
            }else{
                const request = {
                    "quiz_id": data[0].quiz_id,
                    "quizdata_question": createQuizData.quizdata_question,
                    "quizdata_answers": createQuizData.quizdata_answers
                }
                createQuizDataAPI(request)
                .then(data => {
                    if(data.error){
                        setError(data.error);
                        setLoading(false);
                    }else{
                        setLoading(false);
                    }
                })
                .catch(err => {
                    setError(err);
                    setLoading(false);
                }
                );
            }
        }).catch(err => {
            setError(err);
            setLoading(false);
        }).finally(() => {
            if(unitId){
                setLoading(true);
                findByUnitId(unitId).then(quiz => {
                    if(quiz.length && quiz[0].quiz_id){
                        setLoading(true);
                        findQuizDataByQuizId(quiz[0].quiz_id).then(quizData => {
                            localStorage.setItem('quiz', JSON.stringify(quizData));
                            setQuizData(quizData);
                        })
                        .catch(err => {
                            setError(err);
                        }).finally(() => {
                            setLoading(false);
                        });
                    }else{
                        setQuizData(null);
                        setLoading(false);
                    }
                })
                .catch(err => {
                    setError(err);
                }).finally(() => {
                    setLoading(false);
                });
            }else{
                setQuizData(null);
                setLoading(false);
            }
        })
    }
    React.useEffect(() => {
        if(editQuizData){
            setLoading(true);
            editQuiz(editQuizData)
            .then(data => {
                if(data.error){
                    setError(data.error);
                    setLoading(false);
                }else{
                    setLoading(false);
                }
            }
            ).catch(err => {
                setError(err);
                setLoading(false);
            }
            );
        }
        // eslint-disable-next-line
    }, [editQuizData]);


    React.useEffect(() => {
        if(createQuizData){
            setLoading(true);
            findByUnitId(createQuizData)
            .then(data => {
                if(data.error){
                    setError(data.error);
                    setLoading(false);
                }else{
                    const request = {
                        "quiz_id": data.result[0].quiz_id,
                        "quizdata_question": createQuizData.quizdata_question,
                        "quizdata_answers": createQuizData.quizdata_answers
                    }
                    createQuizDataAPI(request)
                    .then(data => {
                        if(data.error){
                            setError(data.error);
                            setLoading(false);
                        }else{
                            setLoading(false);
                        }
                    })
                    .catch(err => {
                        setError(err);
                        setLoading(false);
                    }
                    );
                }
            }).catch(err => {
                setError(err);
                setLoading(false);
            });
        }
        // eslint-disable-next-line
    }, [createQuizData]);

    React.useEffect(() => {
        if(userStates.loggedout) setQuizData(null)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    React.useEffect(() => {
        const storage = localStorage.getItem("quiz");
        if(storage){
            const parsedStorage = JSON.parse(storage);
            setQuizData(parsedStorage);
        }
         // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    React.useEffect(() => {
        if(unitId){
            setLoading(true);
            findByUnitId(unitId).then(quiz => {
                if(quiz.length && quiz[0].quiz_id){
                    setLoading(true);
                    findQuizDataByQuizId(quiz[0].quiz_id).then(quizData => {
                        localStorage.setItem('quiz', JSON.stringify(quizData));
                        setQuizData(quizData);
                    })
                    .catch(err => {
                        setError(err);
                    }).finally(() => {
                        setLoading(false);
                    });
                }else{
                    setQuizData(null);
                    setLoading(false);
                }
            })
            .catch(err => {
                setError(err);
            }).finally(() => {
                setLoading(false);
            });
        }else{
            setQuizData(null);
            setLoading(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [unitId]);

    return(
        <Quiz.Provider value={{
            states: {
                quizData: quizData,
                unitId: unitId,
                createQuizData: createQuizData,
                currentQuiz: currentQuiz,
                editQuizData: editQuizData,
                numOfCorrectAnswers: numOfCorrectAnswers
            },
            actions: {
                setQuizData: setQuizData,
                setUnitId: setUnitId,
                setCreateQuizData: setCreateQuizData,
                setCurrentQuiz: setCurrentQuiz,
                setEditQuizData: setEditQuizData,
                createAQuiz: createAQuiz,
                createAQuizData: createAQuizData,
                quizProgress: quizProgress,
                setNumOfCorrectAnswers: setNumOfCorrectAnswers,
                deleteQuizDataAPI: deleteQuizDataAPI
            }
        }}>
            {children}
        </Quiz.Provider>
    );
}
export default QuizContext;
