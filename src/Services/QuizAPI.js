const URL = process.env.REACT_APP_API_URL
//const URL = process.env.REACT_APP_LOCAL_API_URL

/**
 * @typedef {Object} returnedQuiz
 * @property {number} quiz_id
 * @property {string} quiz_name
 * @property {number} unit_id
 */

/**
 * @typedef {Object} returnedQuizData
 * @property {number} quiz_id
 * @property {string} quizdata_question
 * @property {string} quizdata_answers
 */

/**
 * @param {string} class_id
 * @return {Promise<returnedQuiz>}
 * @description Get a quiz by class_id
 * @memberof QuizAPI
 * @author Foad Olfat
 */
export const findByUnitId = (unit_id) => {
    return fetch(`${URL}quiz/findByUnitId/${unit_id}`, {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "token": `${JSON.parse(localStorage.getItem("token"))}`
        }
    })
    .then((returnedQuiz) => {
        if(returnedQuiz.status===200) return returnedQuiz.json();
        else return {
            "error": returnedQuiz.message
        }
    })
    .catch((err) => {
        return {
            "error":err
        }
    })
} 

/**
 * @param {string} quiz_id
 * @return {Promise<returnedQuizData>}
 * @description Get a quiz by quiz_id
 * @memberof QuizAPI
 * @author Foad Olfat
 */
export const findQuizDataByQuizId = (quiz_id) => {
    return fetch(`${URL}quizdata/${quiz_id}`, {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "token": `${JSON.parse(localStorage.getItem("token"))}`
        }
    })
    .then((returnedQuizData) => {
        if(returnedQuizData.status===200) return returnedQuizData.json();
        else return {
            "error": returnedQuizData.message
        }
    })
    .catch((err) => {
        return {
            "error":err
        }
    })
}