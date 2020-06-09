

import axios from 'axios';

import exportData from '../../../config/config';

export const getSellerOrders = (sellerName) => async dispatch => {

    const response = await axios.get(exportData.backenedURL + 'read/seller/orders/' + sellerName);
    console.log(response)

    if (response.data.length) {
        dispatch({
            type: 'SELLER_ORDERS',
            payload: response.data
        })
    }
    else {
        dispatch({
            type: 'SELLER_ORDERS',
            payload: []
        })
    }

}

export const updateStatus = (values) => async dispatch => {
    let data={
        orderStatus:"0",
        orderUpdateItem:{
           deliveryStatus: String(values.orderUpdateItem)
        }, 
        productId:values.productId,
    }

    console.log(data)

    await axios.put(exportData.backenedURL + 'write/seller/orders/'+values.orderId, JSON.stringify(data), {
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

             console.log(res)
             dispatch(getSellerOrders(values.sellerName))
            }
        })
        .catch(err => {
            console.log(err)
        })


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

    await axios.put(exportData.backenedURL + 'write/seller/orders/'+values.orderId, JSON.stringify(data), {
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
                dispatch(getSellerOrders(values.sellerName))
             console.log(res)
            }
        })
        .catch(err => {
            console.log(err)
        })

   

}



