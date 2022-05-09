const URL = process.env.REACT_APP_API_URL
//const URL = process.env.REACT_APP_LOCAL_API_URL

/**
 * @typedef {Object} moduleCreationData
 * @property {string} module_name
 * @property {string} module_description
 * @property {string} class_id
 * @property {number} instructor_id
 */

/**
 * @typedef {Array<Object>} returnedModuleData
 * @property {string} module_id
 * @property {string} module_name
 * @property {string} module_descrip
 * @property {string} class_id
 */

/**
 * @typedef {Object} editModuleData
 * @property {string} module_name
 * @property {string} module_descrip
 * @property {string} class_id
 * @property {number} module_id
 */

/**
 * @param {Object} editModuleData
 * @returns {Promise<boolean>}
 * @memberof ModuleAPI
 * @description Edit a module
 * @Author Foad Olfat
 */
 export const editModule = async (editModuleData) => {
    return fetch(`${URL}module/update/${editModuleData.module_id}`, {
        method: 'PUT',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "token": `${JSON.parse(localStorage.getItem("token"))}`
        },
        body: JSON.stringify({
            "module_name": editModuleData.module_name,
            "module_descrip": editModuleData.module_descrip,
            "class_id": editModuleData.class_id
        })
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
 * @param {number} module_id
 * @return {Promise<boolean>}
 * @description Delete module based on module id
 * @memberof ModuleAPI
 * @author Foad Olfat
 */
export const deleteModule = (module_id) => {
    return fetch(`${URL}module/delete/${module_id}`, {
        method: "DELETE",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "token": `${JSON.parse(localStorage.getItem("token"))}`
        }
    })
    .then((returnedModuleData) => {
        if(returnedModuleData.status===200) return returnedModuleData.json();
        else return {
            "error": returnedModuleData.message
        }
    })
    .catch((err) => {
        return {
            "error":err
        }
    });
}

/**
 * @param {moduleCreationData} moduleCreationData
 * @return {Promise<returnedModuleData>}
 * @description Creates a new module
 * @memberof ModuleAPI
 * @author Foad Olfat
 */
export const createModule = (moduleCreationData) => {
    return fetch(`${URL}module/create`, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "token": `${JSON.parse(localStorage.getItem("token"))}`
        },
        body: JSON.stringify({
            "module_name": moduleCreationData.module_name,
            "module_descrip": moduleCreationData.module_descrip,
            "class_id": moduleCreationData.class_id,
            "instructor_id": moduleCreationData.instructor_id
        })
    })
    .then((returnedModuleData) => {
        if(returnedModuleData.status===200) return returnedModuleData.json();
        else return {
            "error": returnedModuleData.message
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
 * @return {Promise<returnedModuleData>}
 * @description Get a module by class_id
 * @memberof ModuleAPI
 * @author Foad Olfat
 */
export const findByClassId = (class_id) => {
    return fetch(`${URL}module/findByClass/${class_id}`, {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "token": `${JSON.parse(localStorage.getItem("token"))}`
        }
    })
    .then((returnedModuleData) => {
        if(returnedModuleData.status===200) return returnedModuleData.json();
        else return {
            "error": returnedModuleData.message
        }
    })
    .catch((err) => {
        return {
            "error":err
        }
    })
}