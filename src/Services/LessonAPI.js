const URL = process.env.REACT_APP_API_URL
//const URL = process.env.REACT_APP_LOCAL_API_URL

/**
 * @typedef {Object} lessonCreationData
 * @property {string} lesson_name
 * @property {string} lesson_descrip
 * @property {number} module_id
 * @property {number} instructor_id
 * @property {number} lesson_index
 */

/**
 * @typedef {Object} returnedLessonData
 * @property {string} lesson_id
 * @property {string} lesson_name
 * @property {string} lesson_descrip
 * @property {number} module_id
 * @property {number} instructor_id
 * @property {number} lesson_index
 */

/**
 * @param {lessonCreationData} lessonCreationData
 * @return {Promise<returnedLessonData>}
 * @description Creates a new lesson
 * @memberof LessonAPI
 * @author Foad Olfat
 */
export const createLesson = (lessonCreationData) => {
    return fetch(`${URL}lesson/create`, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "token": `${JSON.parse(localStorage.getItem("token"))}`
        },
        body: JSON.stringify({
            lessonCreationData
        })
    })
    .then((returnedLessonData) => {
        if(returnedLessonData.status===200) return returnedLessonData.json();
        else return {
            "error": returnedLessonData.message
        }
    })
    .catch((err) => {
        return {
            "error":err
        }
    })
}

export const findByModuleId = (module_id) => {
    return fetch(`${URL}lesson/findByModule/${module_id}`, {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "token": `${JSON.parse(localStorage.getItem("token"))}`
        }
    })
    .then((returnedLessonData) => {
        if(returnedLessonData.status===200) return returnedLessonData.json();
        else return {
            "error": returnedLessonData.message
        }
    })
    .catch((err) => {
        return {
            "error":err
        }
    })
}
