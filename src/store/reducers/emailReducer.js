import axios from 'axios';

const POST_EMAIL = 'POST_EMAIL';

const addEmail = email => {
    return { type: POST_EMAIL, email }
}

export const postEmail = emailObj => {
    return dispatch => {
        axios.post("/api/mail", emailObj)
            .then(res => res.data)
            .then(email => {
                dispatch(addEmail(email))
            })
            .catch(err => console.log(err))
    }
}