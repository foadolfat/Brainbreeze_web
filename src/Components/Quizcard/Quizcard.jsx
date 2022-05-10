import * as React from 'react';
import Answers from './Answers.jsx';
import {User} from '../../Contexts/UserContext';
import {Quiz} from '../../Contexts/QuizContext';
import "./Quizcard.css";

const Quizcard = (props) => {
    const {states:UserStates} = React.useContext(User);
    const {actions:QuizActions} = React.useContext(Quiz);
    return(
        <div className="quizbox">
            {
                props.data &&
                <div>
                    <h2>{props.data.quizdata_question}</h2>
                    {
                        JSON.parse(props.data.quizdata_answers.replaceAll('\'','"')).choices && JSON.parse(props.data.quizdata_answers.replaceAll('\'','"')).choices.length &&
                        JSON.parse(props.data.quizdata_answers.replaceAll('\'','"')).choices.map((data,index)=>{
                            return <Answers key={index} index={index} quiz_id={props.data.quiz_id} data={data} correctAnswer={JSON.parse(props.data.quizdata_answers.replaceAll('\'','"')).answer}/>
                        })
                    }
                    {UserStates.user.user_type === "instructor" &&
                        <button className="tab-button" onClick={
                            ()=>{
                                QuizActions.deleteQuizDataAPI(props.data.quiz_id, props.data.quizdata_id);
                            }
                        }>Delete</button>
                    }
                </div>
            }
        </div>
    )
}
export default Quizcard;