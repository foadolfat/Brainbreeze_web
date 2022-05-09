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
 * @param {Object} editUnitData
 * @returns {Promise<boolean>}
 * @memberof UnitAPI
 * @description Edit a Unit
 * @Author Foad Olfat
 */
 export const editUnit = async (editUnitData) => {
    console.log(editUnitData)
   return fetch(`${URL}unit/updateUnitContent/${parseInt(editUnitData.unit_id)}`, {
       method: 'PUT',
       headers: {
           "Accept": "application/json",
           "Content-Type": "application/json",
           "token": `${JSON.parse(localStorage.getItem("token"))}`
       },
       body: JSON.stringify({
           "unit_content": editUnitData.unit_content,
           "unit_content_type": editUnitData.unit_content_type
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
   });
}

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

/**
 * @param {number} lesson_id
 * @return {Promise<returnedUnitData>}
 * @description Gets all units for a lesson
 * @memberof UnitAPI
 * @author Foad Olfat
 */
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

/**
 * @param {number} unit_id
 * @return {Promise<returnedUnitData>}
 * @description Gets a unit by its id
 * @memberof UnitAPI
 * @author Foad Olfat
 */
export const deleteUnit = (unit_id) => {
    return fetch(`${URL}unit/delete/${unit_id}`, {
        method: "DELETE",
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