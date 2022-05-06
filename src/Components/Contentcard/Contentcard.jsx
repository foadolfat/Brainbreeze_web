import * as React from 'react';
import {Content} from '../../Contexts/ContentContext';
import {Quiz} from '../../Contexts/QuizContext';
import {Nav} from '../../Contexts/NavContext';
import Quizcard from '../Quizcard/Quizcard';
import YouTube from 'react-youtube';

const Contentcard = (props) => {
    const {states:ContentStates} = React.useContext(Content);
    const {states:QuizStates} = React.useContext(Quiz);
    const {states:NavStates} = React.useContext(Nav);
    const [showQuiz, setShowQuiz] = React.useState(false);
    const video_id_extractor = (url) => {
        var video_id=url
        var ampersandPosition = video_id.indexOf('&');
        if(ampersandPosition !== -1) {
            video_id = video_id.substring(0, ampersandPosition);
        }
        return video_id;
    }
    function YoutubePlayer() {
        try {
          return <YouTube videoId={video_id_extractor(ContentStates.currentContent.id).split('v=')[1]}/>
        } catch (error) {
          return ''
        }
    }
    return (
        <div>
            <h1>Content Card</h1>
            <div>
                {
                    !showQuiz && ContentStates && ContentStates.currentContent
                    ?
                    <div>
                        <h2>{ContentStates.currentContent.type}</h2>
                        <h2>{ContentStates.currentContent.name}</h2>
                        {typeof(ContentStates.currentContent.id) === "string" && (ContentStates.currentContent.id).startsWith("https://www.youtube.com") &&
                            <YoutubePlayer/>
                        }
                        <p>{ContentStates.currentContent.id}</p>
                        <p>{ContentStates.currentContent.content}</p>
                    </div>
                    :
                    <div>
                        <h2>No Content Selected</h2>
                    </div>
                }
            </div>
            {NavStates.nav==="content" && 
                <div>
                    {showQuiz &&
                        <div>
                            {
                                QuizStates && QuizStates.quizData && QuizStates.quizData.length > 0
                                ?
                                <div>
                                    {
                                        QuizStates.quizData.map((data,index)=>{
                                            return <Quizcard key={index} data={data}/>
                                        })
                                    }
                                </div>
                                :
                                <div>
                                    <h2>No Quiz Found</h2>
                                </div>
                            }
                        </div>
                    }
                    <button onClick={() => setShowQuiz(!showQuiz)}>{!showQuiz? "Show Quiz" : "Show Content"}</button>
                </div>
            }
        </div>
    );
}
export default Contentcard;