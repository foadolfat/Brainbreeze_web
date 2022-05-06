import * as React from 'react';
import "./Quizcard.css";

const Answers = (props) => {
    const [isCorrect, setIsCorrect] = React.useState(false);
    const [isSelected, setIsSelected] = React.useState(false);
    return(
        <div>
            {props.data &&
                <div>
                    <button className={`${isSelected ? `${isCorrect ? "quizchoice-correct" : "quizchoice-incorrect"}` : ""} quizchoice`} onClick={() => {
                        setIsSelected(true);
                        props.correctAnswer === props.index && setIsCorrect(true);
                    }}>{props.data}</button>
                </div>
            }
        </div>
    )
}
export default Answers;