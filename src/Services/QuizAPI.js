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
 * @typedef {Object} quizCreationData
 * @property {string} quiz_name
 * @property {number} unit_id
 * @property {number} instructor_id
 * @property {string} quizdata_question
 * @property {string} quizdata_answers
 */

/**
 * @typedef {Object} quizUpdateData
 * @property {number} quiz_id
 * @property {number} quizdata_id
 * @property {string} quizdata_question
 * @property {string} quizdata_answers
 */

/**
 * @typedef {Object} returnedQuiz
 * @property {number} quiz_id
 * @property {string} quiz_name
 * @property {number} unit_id
 * @property {number} instructor_id
 */

/**
 * @param {number} quiz_id
 * @returns {Promise<returnedQuiz[]>}
 * @throws {Error}
 * @memberof QuizAPI
 * @Author Foad Olfat
 */
export const getQuizData = (quiz_id) => {
    return fetch(`${URL}quizdata/${parseInt(quiz_id)}`)
    .then(response => response.json())
    .then(data => {
        if(data.error){
            return {error: data.error}
        }else{
            return data
        }
    })
    .catch(err => {
        return {error: err}
    })
}

/**
 * @param {Object} editQuizData
 * @returns {Promise<boolean>}
 * @memberof QuizAPI
 * @description This function will update a quiz
 * @Author Foad Olfat
 */
export const editQuiz = (editQuizData) => {
    return fetch(`${URL}quizData/update/${editQuizData.quiz_id}`, {
        method: 'PUT',
        headers: {
            "Accept": "application/json",
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(editQuizData)
    }).then(res => res.json())
    .then(data => {
        return data;
    }).catch(err => {
        return err;
    });
}

/**
 * @param {number} quiz_id
 * @param {number} quizdata_id
 * @returns {Promise<boolean>}
 * @memberof QuizAPI
 * @description Delete a quiz
 * @Author Foad Olfat
 */
 export const deleteQuizData = async (quiz_id, quizData_id) => {
    return fetch(`${URL}quizData/delete/${quiz_id}/${quizData_id}`, {
        method: 'DELETE',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "token": `${JSON.parse(localStorage.getItem("token"))}`
        }
        })
        .then((res) => {
            if(res.status===200) return res.json();
            else return {
                "error": res.message
            }
        })
        .catch((err) => {
            return {
                "error":err
            }
        });
}

/**
 * @param {number} quiz_id
 * @returns {Promise<boolean>}
 * @memberof QuizAPI
 * @description Delete a quiz
 * @Author Foad Olfat
 */
export const deleteQuiz = async (quiz_id) => {
    return fetch(`${URL}quiz/delete/${quiz_id}`, {
        method: 'DELETE',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "token": `${JSON.parse(localStorage.getItem("token"))}`
        }
        })
        .then((res) => {
            if(res.status===200) return res.json();
            else return {
                "error": res.message
            }
        })
        .catch((err) => {
            return {
                "error":err
            }
        });
}

/**
 * @param {object} quizData
 * @returns {Promise<boolean>}
 * @memberof QuizAPI
 * @description This function will create a quiz
 * @Author Foad Olfat
 */
export const createQuizDataAPI = async (quizData) => {
    console.log(quizData)
    return fetch(`${URL}quizData/create`, {
        method: 'POST',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "token": `${JSON.parse(localStorage.getItem("token"))}`
        },
        body: JSON.stringify({
            "quiz_id": quizData.quiz_id,
            "quizdata_question": quizData.quizdata_question,
            "quizdata_answers": JSON.stringify(quizData.quizdata_answers)
        })
    })
    .then((res) => {
        console.log(res)
        if(res.status===200) return res.json();
        else return {
            "error": res.message
        }
    })
    .catch((err) => {
        console.log(err)
        return {
            "error":err
        }
    })
}

/**
 * @param {quizCreationData} quizCreationData
 * @return {Promise<returnedQuiz>}
 * @description Creates a new quiz
 * @memberof QuizAPI
 * @author Foad Olfat
 */
export const createQuiz = async (quizData) => {
    console.log(quizData)
    return fetch(`${URL}quiz/create`, {
        method: 'POST',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "token": `${JSON.parse(localStorage.getItem("token"))}`
        },
        body: JSON.stringify({
            "quiz_name": quizData.quiz_name,
            "unit_id": quizData.unit_id,
            "instructor_id": quizData.instructor_id
        })
    })
    .then((result) => {
        if(result.status===201) return result.json();
        else return {
            "error": result.message
        }
    })
}

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