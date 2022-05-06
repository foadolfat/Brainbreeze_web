import * as React from 'react';
import {Error} from './ErrorContext';
import {Load} from './LoadContext';
import {findByUnitId, findQuizDataByQuizId} from '../Services/QuizAPI';
import {User} from './UserContext';

export const Quiz = React.createContext();

const QuizContext = ({children}) => {
    const {actions:errorActions} = React.useContext(Error);
    const {actions:loadActions} = React.useContext(Load);
    const {states:userStates} = React.useContext(User);
    const [unitId, setUnitId] = React.useState();
    const setLoading = loadActions.setLoading;
    const setError = errorActions.setError;
    const [quizData, setQuizData] = React.useState(null);

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
                unitId: unitId
            },
            actions: {
                setQuizData: setQuizData,
                setUnitId: setUnitId
            }
        }}>
            {children}
        </Quiz.Provider>
    );
}
export default QuizContext;
