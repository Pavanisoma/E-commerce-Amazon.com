import axios from 'axios';

import exportData from '../../../config/config';

export const getAdminOrders = () => async dispatch => {

    const response = await axios.get(exportData.backenedURL + 'read/admin/orders/');
    console.log(response)

    if (response.data.length) {
        dispatch({
            type: 'ADMIN_ORDERS',
            payload: response.data
        })
    }
    else {
        dispatch({
            type: 'ADMIN_ORDERS',
            payload: []
        })
    }

}
export const getSellers = () => async dispatch => {

    try {
        const response = await axios.get(exportData.backenedURL + 'read/seller/profile');
        if (response.data.length) {
            dispatch({
                type: 'TOTAL_SELLERS',
                payload: response.data
            })
        }
        else {
            dispatch({
                type: 'TOTAL_SELLERS',
                payload: []
            })
        }
    }
    catch (e) {
        console.log(e)
    }


}


export const updateStatus = (values) => async dispatch => {
    console.log(values.orderUpdateItem)
    let data = {
        orderStatus: values.orderUpdateItem == "5" ? "1" : "0",
        orderUpdateItem: {
            deliveryStatus: String(values.orderUpdateItem)
        },
        productId: values.productId,
    }

    console.log(data)

    await axios.put(exportData.backenedURL + 'write/seller/orders/' + values.orderId, JSON.stringify(data), {
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
//dispatch(getAdminOrders())
                console.log(res)
            }
        })
        .catch(err => {
            console.log(err)
        })


}


export const searchAPI = (values) => async (dispatch) => {

    console.log(values)
    if (values.sellerName && values.orderStatusValue) {
     //   http://localhost:3000/read/admin/orders?sellerName=Apple&orderStatus=open orders
        try {
            const response = await axios.get(exportData.backenedURL + 'read/admin/orders?sellerName=' + values.sellerName + '&orderStatus=' + values.orderStatusValue)
            if (response.data.length) {
                dispatch({
                    type: 'ADMIN_ORDERS',
                    payload: response.data
                })
            }
            else {
                dispatch({
                    type: 'ADMIN_ORDERS',
                    payload: []
                })
            }
        }
        catch (e) {
            console.log(e)
        }
    }
    else if(values.sellerName && !values.orderStatusValue){
        try {
            const response = await axios.get(exportData.backenedURL + 'read/admin/orders?sellerName=' + values.sellerName)
         //   console.log(response)

            if (response.data.length) {
                dispatch({
                    type: 'ADMIN_ORDERS',
                    payload: response.data
                })
            }
            else {
                dispatch({
                    type: 'ADMIN_ORDERS',
                    payload: []
                })
            }
        }
        catch (e) {
            console.log(e)
        }
    }
    else if(!values.sellerName && values.orderStatusValue){

        try {
            const response = await axios.get(exportData.backenedURL + 'read/admin/orders?orderStatus=' + values.orderStatusValue)
       //     console.log(response)
            if (response.data.length) {
                dispatch({
                    type: 'ADMIN_ORDERS',
                    payload: response.data
                })
            }
            else {
                dispatch({
                    type: 'ADMIN_ORDERS',
                    payload: []
                })
            }
        }
        catch (e) {
            console.log(e)
        }
    }
    else{
        try {
            const response = await axios.get(exportData.backenedURL + 'read/admin/orders/');
           // console.log(response)
            if (response.data.length) {
                dispatch({
                    type: 'ADMIN_ORDERS',
                    payload: response.data
                })
            }
            else {
                dispatch({
                    type: 'ADMIN_ORDERS',
                    payload: []
                })
            }
        }
        catch (e) {
            console.log(e)
        }
    
    }


}