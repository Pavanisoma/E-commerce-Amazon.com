import axios from 'axios';

import exportData from '../../../config/config';

export const login = (data) => async dispatch => {

    await axios.post(exportData.backenedURL + 'write/login' , data , {
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',

    }
}) 
.then(async res => {
    console.log(res)
    if (res.status === 200) {    
       console.log(res)
       dispatch({
        type: 'LOGIN',
        payload: res
    })
    } else {   
        console.log(res)   
    }
})
 .catch(err => {
     console.log(err)
     dispatch({
        type: 'LOGIN',
        payload: 404
    })
 })

}




export const SignUp = (values) => async dispatch => {
   console.log(values)
    await axios.post(exportData.backenedURL + 'write/signup' , JSON.stringify(values) , {
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
}) 
.then(async res => {
    console.log(res)
    if (res.status === 200) {    
       console.log(res)
       dispatch({
        type: 'SIGNUP',
        payload: res.status
    })
    } else {   
        console.log(res)   
    }
})
 .catch(err => {
     console.log(err)
     dispatch({
        type: 'SIGNUP',
        payload: 404
    })
 })

}

