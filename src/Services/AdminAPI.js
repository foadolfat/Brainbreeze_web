export const deleteUser = (AdminDeleteUserObject) => {
    return fetch(`${process.env.REACT_APP_API_URL}admin/delete/user/${parseInt(AdminDeleteUserObject.user_id)}`, {
        method: "DELETE",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "token": `${JSON.parse(localStorage.getItem("token"))}`
        },
        body: JSON.stringify({
            "user_email":AdminDeleteUserObject.user_email,
            "user_password":AdminDeleteUserObject.password
        })
    })
    .then((result) => {
        if(result.status===200) return result.json();
        else return {
            "error": result.message
        }
    });
}

export const deleteClass = (AdminDeleteClassObject) => {
    return fetch(`${process.env.REACT_APP_API_URL}admin/delete/class/${JSON.stringify(AdminDeleteClassObject.class_id)}`, {
        method: "DELETE",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "token": `${JSON.parse(localStorage.getItem("token"))}`
        },
        body: JSON.stringify({
            "user_email":AdminDeleteClassObject.user_email,
            "user_password":AdminDeleteClassObject.password
        })
    })
    .then((result) => {
        if(result.status===200) return result.json();
        else return {
            "error": result.message
        }
    });
}