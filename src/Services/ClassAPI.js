const URL = process.env.REACT_APP_API_URL
//const URL = process.env.REACT_APP_LOCAL_API_URL

/**
 * @typedef {Object} classCreationData
 * @property {string} class_name
 * @property {string} class_description
 */

/**
 * @typedef {Object} returnedClassFindByIdData
 * @property {string} class_id
 * @property {string} class_name
 * @property {string} class_descrip
 * @property {number} instructor_id
 * @property {number} user_class
 */

/**
 * @typedef {Object} returnedCreatedClass
 * @property {boolean} message
 * @property {string} class_id
 * @property {string} class_name
 * @property {string} class_descrip
 * @property {number} instructor_id
 */

/**
 * @typedef {Object} editClassData
 * @property {string} class_name
 * @property {string} class_description
 * @property {string} class_id
 */

export const dropClass = (class_id) => {
    return fetch(`${URL}class/drop/${class_id}`, {
        method: "DELETE",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "token": `${JSON.parse(localStorage.getItem("token"))}`
        }
    })
    .then((result) => {
        if(result.status===200) return result.json();
        else return {
            "error": result.message
        }
    });
}

/**
 * @param {Object} editClassData
 * @returns {Promise<boolean>}
 * @memberof ClassAPI
 * @description Edit a class
 * @Author Foad Olfat
 */
export const editClass = async (editClassData) => {
    return fetch(`${URL}class/update/${editClassData.class_id}`, {
        method: 'PUT',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "token": `${JSON.parse(localStorage.getItem("token"))}`
        },
        body: JSON.stringify({
            "class_name": editClassData.class_name,
            "class_description": editClassData.class_description
        })
    })
    .then((returnedClassData) => {
        if(returnedClassData.status===200) return returnedClassData.json();
        else return {
            "error": returnedClassData.message
        }
    })
    .catch((err) => {
        return {
            "error":err
        }
    });
}

/**
 * @param {number} class_id
 * @return {Promise<boolean>}
 * @description Delete class based on class id
 * @memberof ClassAPI
 * @author Foad Olfat
 */
export const deleteClass = (class_id) => {
    return fetch(`${URL}class/delete/${class_id}`, {
        method: "DELETE",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "token": `${JSON.parse(localStorage.getItem("token"))}`
        }
    })
    .then((returnedClassData) => {
        console.log(returnedClassData.json())
        if(returnedClassData.status===200) return returnedClassData.json();
        else return {
            "error": returnedClassData.message
        }
    })
    .catch((err) => {
        return {
            "error":err
        }
    });
}


/**
 * @param {Object} classCreationData
 * @return {Promise<returnedCreatedClass>}
 * @description Creates a new class
 * @memberof ClassAPI
 * @author Foad Olfat
 */
export const createClass = (classCreationData) => {
    return fetch(`${URL}class/create`, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "token": `${JSON.parse(localStorage.getItem("token"))}`
        },
        body: JSON.stringify({
            "class_name": classCreationData.class_name,
            "class_descrip": classCreationData.class_descrip
        })
    })
    .then((returnedCreatedClass) => {
        if(returnedCreatedClass.status===200) return returnedCreatedClass.json();
        else return {
            "error": returnedCreatedClass.message
        }
    })
    .catch((err) => {
        return {
            "error":err
        }
    })
}

/**
 * @param {string} class_id
 * @return {Promise<returnedClassFindByIdData>}
 * @description Get a class by user_id
 * @memberof ClassAPI
 * @author Foad Olfat
 */
export const findByUser = (user_id) => {
    return fetch(`${URL}class/findByUser/${user_id}`, {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "token": `${JSON.parse(localStorage.getItem("token"))}`
        }
    })
    .then((returnedClassFindByIdData) => {
        if(returnedClassFindByIdData.status===200) return returnedClassFindByIdData.json();
        else return {
            "error": returnedClassFindByIdData.message
        }
    })
    .catch((err) => {
        return {
            "error":err
        }
    })
}

/**
 * @param {string} class_id
 * @return {Promise<returnedClassFindByIdData>}
 * @description Get a list of classes by name
 * @memberof ClassAPI
 * @author Foad Olfat
 */
export const findByName = (class_name) => {
    return fetch(`${URL}class/findByName/${class_name}`, {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    })
    .then((returnedClassFindByIdData) => {
        if(returnedClassFindByIdData.status===200) return returnedClassFindByIdData.json();
        else return {
            "error": returnedClassFindByIdData.message
        }
    })
    .catch((err) => {
        return {
            "error":err
        }
    })
}

/**
 * @param {string} class_id
 * @return {Promise<boolean>}
 * @description Sign up for a class by student
 * @memberof ClassAPI
 * @author Foad Olfat
 */
export const signUp = (class_id) => {
    return fetch(`${URL}class/signUp/${class_id}`, {
        method: "POST",
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
    })
}