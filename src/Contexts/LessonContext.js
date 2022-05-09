import * as React from 'react';
import {Error} from './ErrorContext';
import {Load} from './LoadContext';
import {findByModuleId, createLesson, deleteLesson} from '../Services/LessonAPI';
import {User} from './UserContext';

export const Lesson = React.createContext();

const LessonContext = ({children}) => {
    const {actions:errorActions} = React.useContext(Error);
    const {actions:loadActions} = React.useContext(Load);
    const {states:userStates} = React.useContext(User);
    const [moduleId, setModuleId] = React.useState("");
    const setLoading = loadActions.setLoading;
    const setError = errorActions.setError;
    const [lessonData, setLessonData] = React.useState(null);
    const [createLessonData, setCreateLessonData] = React.useState(null);
    const [currentLesson, setCurrentLesson] = React.useState(null);

    const deleteLessonFunc = (lesson_id) => {
        setLoading(true);
        deleteLesson(lesson_id)
        .then((returnedLessonData) => {
            if(returnedLessonData.error) {
                setError(returnedLessonData.error);
                setLoading(false);
            }
        });
        setLoading(false);
    }

    React.useEffect(() => {
        if(userStates.loggedout) setLessonData(null)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userStates.loggedout]);

    React.useEffect(() => {
        const storage = localStorage.getItem("lesson");
        if(storage){
            const parsedStorage = JSON.parse(storage);
            setLessonData(parsedStorage);
        }
    } , []);

    React.useEffect(() => {
        if(createLessonData){
            setLoading(true);
            createLesson(createLessonData).then(lessonData => {
                localStorage.setItem('lesson', JSON.stringify(lessonData));
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
    }, [createLessonData]);

    React.useEffect(() => {
        if(moduleId){
            setLoading(true);
            findByModuleId(moduleId).then(lessonData => {
                localStorage.setItem('lesson', JSON.stringify(lessonData));
                setLessonData(lessonData);
            })
            .catch(err => {
                setError(err);
            }).finally(() => {
                setLoading(false);
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [moduleId]);

    return(
        <Lesson.Provider value={{
            states: {
                lessonData: lessonData,
                moduleId: moduleId,
                setModuleId: setModuleId,
                createLessonData: createLessonData,
                setCreateLessonData: setCreateLessonData,
                currentLesson: currentLesson,
            },
            actions: {
                setLessonData: setLessonData,
                setModuleId: setModuleId,
                setCreateLessonData: setCreateLessonData,
                deleteLessonFunc: deleteLessonFunc,
                setCurrentLesson: setCurrentLesson,
            }
        }}>
            {children}
        </Lesson.Provider>
    );
}
export default LessonContext;