const URL = process.env.REACT_APP_API_URL
//const URL = process.env.REACT_APP_LOCAL_API_URL
/**
 * @typedef {Object} unitCreationData
 * @property {number} unit_name
 * @property {string} unit_content
 * @property {string} unit_content_type
 * @property {number} lesson_id
 * @property {number} instructor_id
 */


/**
 * @typedef {Object} returnedUnitData
 * @property {number} unit_id
 * @property {string} unit_name
 * @property {string} unit_content
 * @property {string} unit_content_type
 * @property {number} lesson_id
 * @property {number} instructor_id
 */

/**
 * @param {unitCreationData} unitCreationData
 * @return {Promise<returnedUnitData>}
 * @description Creates a new unit
 * @memberof UnitAPI
 * @author Foad Olfat
 */
export const createUnit = (unitCreationData) => {
    return fetch(`${URL}unit/create`, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "token": `${JSON.parse(localStorage.getItem("token"))}`
        },
        body: JSON.stringify({
            "unit_name": unitCreationData.unit_name,
            "unit_content": unitCreationData.unit_content,
            "unit_content_type": unitCreationData.unit_content_type,
            "lesson_id": unitCreationData.lesson_id,
            "instructor_id": unitCreationData.instructor_id
        })
    })
    .then((returnedUnitData) => {
        if(returnedUnitData.status===200) return returnedUnitData.json();
        else return {
            "error": returnedUnitData.message
        }
    })
    .catch((err) => {
        return {
            "error":err
        }
    })
}

export const findByLesson = (lesson_id) => {
    return fetch(`${URL}unit/findByLesson/${lesson_id}`, {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "token": `${JSON.parse(localStorage.getItem("token"))}`
        }
    })
    .then((returnedUnitData) => {
        if(returnedUnitData.status===200) return returnedUnitData.json();
        else return {
            "error": returnedUnitData.message
        }
    })
    .catch((err) => {
        return {
            "error":err
        }
    })
}