import * as React from 'react';
import {Quiz} from '../../Contexts/QuizContext';
import "./Quizcard.css";

const Answers = (props) => {
    const {actions:QuizActions, states:QuizStates} = React.useContext(Quiz);
    const [isCorrect, setIsCorrect] = React.useState(false);
    const [isSelected, setIsSelected] = React.useState(false);
    return(
        <div>
            {props.data &&
                <div>
                    <button className={`${isSelected ? `${isCorrect ? "quizchoice-correct" : "quizchoice-incorrect"}` : ""} quizchoice`} onClick={() => {
                        setIsSelected(true);
                        if(parseInt(props.correctAnswer) === props.index){
                            QuizActions.setNumOfCorrectAnswers(QuizStates.numOfCorrectAnswers + 1);
                            QuizActions.quizProgress(props.quiz_id);
                            setIsCorrect(true);
                        }
                    }}>{props.data}</button>
                </div>

            }
        </div>
    )
}
export default Answers;