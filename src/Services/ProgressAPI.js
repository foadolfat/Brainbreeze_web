const URL = process.env.REACT_APP_API_URL
//const URL = process.env.REACT_APP_LOCAL_API_URL

export const createProgress = (unit_id, instructor_id) => {
    return fetch(`${URL}progress/create`, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "token": `${JSON.parse(localStorage.getItem("token"))}`
        },
        body: JSON.stringify({
            unit_id,
            instructor_id
          })
    })
    .then((returnedProgressData) => {
        if(returnedProgressData.status===200) return returnedProgressData.json();
        else return {
            "error": returnedProgressData.message
        }
    })
    .catch((err) => {
        return {
            "error":err
        }
    });
}

export const findByUnit = (unit_id, user_id) => {
    console.log("progress unit route ",typeof(unit_id), typeof(user_id))
    return fetch(`${URL}progress/findByUnit/${unit_id}/${user_id}`, {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "token": `${JSON.parse(localStorage.getItem("token"))}`
        }
    })
    .then((returnedProgressData) => {
        // console.log("progress unit route ",returnedProgressData)
        if(returnedProgressData.status===201) return returnedProgressData.json();
        else return {
            "error": returnedProgressData.message
        }
    })
    .catch((err) => {
        return {
            "error":err
        }
    })
}

export const findByLessonAndUser = (lesson_id, user_id) => {
    
    return fetch(`${URL}progress/findByLessonAndUser/${lesson_id}/${user_id}`, {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "token": `${JSON.parse(localStorage.getItem("token"))}`
        }
    })
    .then((returnedProgressData) => {
        if(returnedProgressData.status===201) return returnedProgressData.json();
        else return {
            "error": returnedProgressData.message
        }
    })
    .catch((err) => {
        return {
            "error":err
        }
    })
}