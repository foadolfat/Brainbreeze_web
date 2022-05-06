import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import UserContext from './Contexts/UserContext';
import ClassContext from './Contexts/ClassContext';
import LoadContext from './Contexts/LoadContext';
import ErrorContext from './Contexts/ErrorContext';
import NavContext from './Contexts/NavContext';
import ModuleContext from './Contexts/ModuleContext';
import LessonContext from './Contexts/LessonContext';
import UnitContext from './Contexts/UnitContext';
import ContentContext from './Contexts/ContentContext';
import QuizContext from './Contexts/QuizContext';
// import ProgressContext from './Contexts/ProgressContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <NavContext>
    <ErrorContext>
      <LoadContext>
        <UserContext>
          {/* <ProgressContext> */}
            <ClassContext>
              <ModuleContext>
                <LessonContext>
                  <UnitContext>
                    <ContentContext>
                      <QuizContext>
                        <App />
                      </QuizContext>
                    </ContentContext>
                  </UnitContext>
                </LessonContext>
              </ModuleContext>
            </ClassContext>
          {/* </ProgressContext> */}
        </UserContext>
      </LoadContext>
    </ErrorContext>
  </NavContext>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
