const URL = process.env.REACT_APP_API_URL
//const URL = process.env.REACT_APP_LOCAL_API_URL
  /**
   * @typedef {Object} userData
   * @property {string} user_name
   * @property {string} user_email
   * @property {string} user_password
   * @property {string} user_type
   * @property {string} user_pp
   * @property {string} user_bio
   */

  /**
   * @typedef {Object} returnedUser
   * @property {string} auth
   * @property {string} token
   * @property {string} user_email
   * @property {string} user_name
   * @property {string} user_type
   * @property {string} user_id
   * @property {string} user_pp
   * @property {string} user_bio
   */

  /**
  * @param {Object} userData
  * @return {Promise}
  * @description Creates a new user
  * @memberof Authentication
  * @author Foad Olfat
  */
  export const signUp = (userData) =>{
    return fetch(`${URL}user/create`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "user_name": userData.user_name,
          "user_email": userData.user_email,
          "user_password": userData.user_password,
          "user_type": userData.user_type,
          "user_pp": userData.user_pp,
          "user_bio": userData.user_bio
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
    })
  }
  
  /**
   * @param {string} user_email
   * @param {string} user_password
   * @return {Promise<returnedUser>}
   * @description Logs in a user
   * @memberof Authentication
   * @author Foad Olfat
   */
  export const signIn = (user_email, user_password) => {
    return fetch(`${URL}user/signin`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_email,
          user_password
        })
    })
    .then((returnedUser) => {
      if(returnedUser.status===200) return returnedUser.json();
      else return {
          "error": returnedUser.message
      }
    })
    .catch((err) => {
      return {
        "error":err
      }
    })
  }


