import axios from 'axios';

import exportData from '../../../config/config';

export const getCustOrders = (user_id) => async dispatch => {

    const response = await axios.get(exportData.backenedURL + 'read/customer/orders/' + user_id);
    console.log(response)

    if (response.data.length) {
        dispatch({
            type: 'CUSTOMER_ORDERS',
            payload: response.data
        })
    }
    else {
        dispatch({
            type: 'CUSTOMER_ORDERS',
            payload: []
        })
    }

}

export const cancelOrderAPI = (values) => async dispatch => {
    let data={
        orderStatus:"2",
        totalPrice:0,
        orderUpdateItem:{
           deliveryStatus: String(values.orderUpdateItem)
        }, 
        productId:values.productId,
    }

    console.log(data)

    await axios.put(exportData.backenedURL + 'write/customer/orders/'+values.orderId, JSON.stringify(data), {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',

        }
    })
        .then(res => {
            if (res.status >= 400) {
                console.log(res)
            }
            else {
                dispatch(getCustOrders(values.user_id));
                console.log(res)
            }
        })
        .catch(err => {
            console.log(err)
        })

   

}





