import * as React from 'react';
import {Quiz} from '../../Contexts/QuizContext';
import {User} from '../../Contexts/UserContext';
import {Nav} from '../../Contexts/NavContext';

const Createquiz = ({setFullMenuVisible, fullMenuVisible}) => {
    const {actions:QuizActions} = React.useContext(Quiz);
    const {states:UserStates} = React.useContext(User);
    const {states:NavStates} = React.useContext(Nav);

    return(
        <div>
            {UserStates.user.user_type === "instructor" && 
            <div>
                <h2>Create Quiz</h2>
                <form onSubmit={(e)=>{
                    e.preventDefault();
                    QuizActions.createAQuizData({
                        quiz_name: e.target.quiz_name.value,
                        unit_id: NavStates.currentUnit,
                        instructor_id: UserStates.user.user_id,
                        quizdata_question: e.target.quizdata_question.value,
                        quizdata_answers: {
                            "answer": e.target.correct_answer.value,
                            "choices":[
                                e.target.quizdata_answer1.value,
                                e.target.quizdata_answer2.value,
                                e.target.quizdata_answer3.value,
                                e.target.quizdata_answer4.value
                            ]
                        }
                    });
                    setFullMenuVisible(false)
                }}>
                    <div>
                        <label>Quiz Name</label>
                        <input type="text" name="quiz_name" placeholder="Quiz Name" required/>
                        <label>Quiz Question</label>
                        <textarea name="quizdata_question" placeholder="Quiz Question" required></textarea>
                        <label>Correct Answer</label>
                        <input type="number" name="correct_answer" min="0" max="3"/>
                        <label>Answer 1</label>
                        <textarea name="quizdata_answer1" placeholder="Answer 1" required></textarea>
                        <label>Answer 2</label>
                        <textarea name="quizdata_answer2" placeholder="Answer 2" required></textarea>
                        <label>Answer 3</label>
                        <textarea name="quizdata_answer3" placeholder="Answer 3" required></textarea>
                        <label>Answer 4</label>
                        <textarea name="quizdata_answer4" placeholder="Answer 4" required></textarea>
                        <input type="submit" ></input>
                    </div>
                </form>
            </div>}
        </div>
    )
}
export default Createquiz;