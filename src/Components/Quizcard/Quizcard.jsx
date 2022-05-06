import * as React from 'react';
import Answers from './Answers.jsx';
import "./Quizcard.css";

const Quizcard = (props) => {
    //TODO - add logic to check if quiz is complete
    return(
        <div className="quizbox">
            {
                props.data &&
                <div>
                    <h2>{props.data.quizdata_question}</h2>
                    {
                        JSON.parse(props.data.quizdata_answers.replaceAll('\'','"')).choices && JSON.parse(props.data.quizdata_answers.replaceAll('\'','"')).choices.length &&
                        JSON.parse(props.data.quizdata_answers.replaceAll('\'','"')).choices.map((data,index)=>{
                            return <Answers key={index} index={index} data={data} correctAnswer={JSON.parse(props.data.quizdata_answers.replaceAll('\'','"')).answer}/>
                        })
                    }
                </div>
            }
        </div>
    )
}
export default Quizcard;