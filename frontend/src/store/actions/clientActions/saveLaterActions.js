import axios from 'axios';
import exportData from '../../../config/config';
import { getCartProducts } from './cartActions';

export const getSave4LaterProducts = (user_id) => async dispatch => {

    const response = await axios.get(exportData.backenedURL + 'read/customer/cart/saveToLater/' + user_id);
    console.log(response)

    if (response.data.length) {
        dispatch({
            type: 'SAVE_LATER_PRODUCTS',
            payload: response.data
        })
    }
    else {
        dispatch({
            type: 'SAVE_LATER_PRODUCTS',
            payload: []
        })
    }

}

export const moveToCart = (values) => async (dispatch) => {

    console.log(values)
    let data = {
        flag: 0
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