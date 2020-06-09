import axios from 'axios';

import exportData from '../../../config/config';
import { getSave4LaterProducts } from './saveLaterActions';

export const getCartProducts = (user_id) => async dispatch => {

    const response = await axios.get(exportData.backenedURL + 'read/customer/cart/' + user_id);
    console.log(response)

    if (response.data.length) {
        dispatch({
            type: 'CART_PRODUCTS',
            payload: response.data
        })
    }
    else {
        dispatch({
            type: 'CART_PRODUCTS',
            payload: []
        })
    }

}


export const updateIsGift = (values) => async (dispatch) => {

    let data = {
        gift:values.gift
    }

    await axios.put(exportData.backenedURL + 'write/customer/cart/'+values.user_id + '/' + values.productId + '/', JSON.stringify(data), {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',

        }
    })
        .then(async res => {
            if (res.status >= 400) {
                console.log(res)
            }
            else {
                 dispatch(getCartProducts(values.user_id));

            }
        })
        .catch(err => {
            console.log(err)
        })
}

export const moveToLater = (values) => async (dispatch) => {

    console.log(values)
    let data = {
        flag: 1
    }

    await axios.put(exportData.backenedURL + 'write/customer/cart/'+values.user_id + '/' + values.productId + '/', JSON.stringify(data), {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',

        }
    })
        .then(async res => {
            if (res.status >= 400) {
                console.log(res)
            }
            else {
                await dispatch(getCartProducts(values.user_id));
                await dispatch(getSave4LaterProducts(values.user_id));


            }
        })
        .catch(err => {
            console.log(err)
        })

}

export const changeQuantity = (values) => async (dispatch) => {

    console.log(values)
    let data = {
        quantity: values.quantity
    }

    await axios.put(exportData.backenedURL + 'write/customer/cart/'+values.user_id + '/' + values.productId + '/', JSON.stringify(data), {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',

        }
    })
        .then(async res => {
            if (res.status >= 400) {
                console.log(res)
            }
            else {
             dispatch(getCartProducts(values.user_id));

            }
        })
        .catch(err => {
            console.log(err)
        })

}

export const deleteProduct = (values) => async (dispatch) => {

   
    await axios.delete(exportData.backenedURL + 'write/customer/cart/'+values.user_id + '/' + values.productId, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',

        }
    })
        .then(async res => {
            if (res.status >= 400) {
                console.log(res)
            }
            else {
             dispatch(getCartProducts(values.user_id));

            }
        })
        .catch(err => {
            console.log(err)
        })

}





