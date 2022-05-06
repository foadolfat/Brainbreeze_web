// import * as React from 'react';
// import {Error} from './ErrorContext';
// import {Load} from './LoadContext';
// import {User} from './UserContext';
// import {findByUnit, findByLessonAndUser} from '../Services/ProgressAPI';

// export const Progress = React.createContext();

// const ProgressContext = ({children}) => {
//     const {actions:ErrorActions, states:ErrorStates} = React.useContext(Error);
//     const {actions:LoadActions, states:LoadStates} = React.useContext(Load);
//     const {states:UserStates} = React.useContext(User);
//     const [unitProgressData, setUnitProgressData] = React.useState(null);
//     const [lessonProgressData, setLessonProgressData] = React.useState(null);
//     const [moduleProgressData, setModuleProgressData] = React.useState(null);
//     const [classProgressData, setClassProgressData] = React.useState(null);
//     const [unitProgress, setUnitProgress] = React.useState(null);
//     const [lessonProgress, setLessonProgress] = React.useState(null);
//     const [moduleProgress, setModuleProgress] = React.useState(null);
//     const [classProgress, setClassProgress] = React.useState(null);

//     React.useEffect(() => {
//         if(unitProgressData){
//             console.log("unitProgressData", unitProgressData, "user_id", UserStates.user.user_id);
//             findByUnit(unitProgressData, UserStates.user.user_id).then(progressData => {
//                 if(progressData.error){
//                     ErrorActions.setError(progressData.error);
//                 }
//                 else{
//                     console.log("unit progress ",progressData);
//                     // setUnitProgress(progressData.AllUnits);
//                 }
//             })
//         }
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, [unitProgressData]);

//     React.useEffect(() => {
//         if(lessonProgressData){
//             findByLessonAndUser(lessonProgressData.lesson_id, UserStates.user.user_id).then(progressData => {
//                 if(progressData.error){
//                     ErrorActions.setError(progressData.error);
//                 }
//                 else{
//                     console.log("lesson progress ",progressData);
//                     // setUnitProgress(progressData.AllUnits);
//                 }
//             })
//         }
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, [lessonProgressData]);

//     return(
//         <Progress.Provider value={{
//             states: {
//                 unitProgressData,
//                 lessonProgressData,
//                 moduleProgressData,
//                 classProgressData,
//                 unitProgress,
//                 lessonProgress,
//                 moduleProgress,
//                 classProgress
//             },
//             actions: {
//                 setUnitProgressData,
//                 setLessonProgressData,
//                 setModuleProgressData,
//                 setClassProgressData
//             }
//         }}>
//             {children}
//         </Progress.Provider>
//     );
// }
// export default ProgressContext;