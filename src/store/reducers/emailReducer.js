import axios from 'axios';
import API_URL from "../../common/consts"; 

const POST_EMAIL = 'POST_EMAIL';

const addEmail = email => {
    return { type: POST_EMAIL, email }
}

export const postEmail = emailObj => {
    return dispatch => {
        axios.post(`${API_URL}/mail`, emailObj)
            .then(res => res.data)
            .then(email => {
                dispatch(addEmail(email))
            })
            .catch(err => console.log(err))
    }
}