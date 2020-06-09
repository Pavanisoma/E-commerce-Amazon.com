import axios from 'axios';

import exportData from '../../../config/config';


export const getALLProducts = () => async dispatch => {
    const response = await axios.get(exportData.backenedURL + 'read/products' );
  //  console.log(response)
    if (response.data.length) {
        dispatch({
            type: 'ALL_PRODUCTS',
            payload: response.data
        })
    }
    else {
        dispatch({
            type: 'ALL_PRODUCTS',
            payload: []
        })
    }

}


export const getProductDetails = (user_id,prod_id) => async dispatch => {

     const response = await axios.get(exportData.backenedURL + 'read/products/' + user_id + '/' + prod_id);
  //   console.log(response)
 
     if (response.data) {
         dispatch({
             type: 'PRODUCT_DETAILS',
             payload: response.data
         })
     }
     else {
         dispatch({
             type: 'PRODUCT_DETAILS',
             payload: []
         })
     }
 
 }


export const getALLProductsBySeller = (s_id) => async dispatch => {
    const response = await axios.get(exportData.backenedURL + 'read/seller/product/' + s_id);
  //  console.log(response)
    if (response.data.length) {
        dispatch({
            type: 'ALL_SELLER_PRODUCTS',
            payload: response.data
        })
    }
    else {
        dispatch({
            type: 'ALL_SELLER_PRODUCTS',
            payload: []
        })
    }
}


 export const getALLCommentsForProduct = (prod_id) => async dispatch => {
     const response = await axios.get(exportData.backenedURL + 'read/customer/comments/product/' + prod_id);
   // console.log(response)
     if (response.data.length) {
         dispatch({
             type: 'ALL_COMMENTS_PRODUCT',
             payload: response.data
         })
     }
     else {
         dispatch({
             type: 'ALL_COMMENTS_PRODUCT',
             payload: []
         })
     }
 
 }



 export const postCommentForProduct = (prod_id,user_id, data) => async dispatch => {

     const response = await axios.post(exportData.backenedURL + 'write/comments/' + user_id + '/'+ prod_id, data, {
         headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
         }
     });
      console.log(response)
     if (response.data.status === 200) {
         dispatch({
             type: 'ADD_PRODUCT_COMMENT',
             payload: response.data
         })
     }
     else {
         dispatch({
             type: 'ADD_PRODUCT_COMMENT',
             payload: []
         })
     }
 
 }



 export const updateProductComment = (values) => async (dispatch) => {

    let data = {
        comment:values.comment
    }

    await axios.put(exportData.backenedURL + 'write/comments/'+values.user_id + '/' + values.productId + '/', JSON.stringify(data), {
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
                 dispatch(getALLCommentsForProduct(values.prod_id));
            }
        })
        .catch(err => {
            console.log(err)
        })
}

export const getALLimagesForProduct = (prod_id) => async dispatch => {
    const response = await axios.get(exportData.backenedURL + 'read/customer/comments/product/' + prod_id);
  // console.log(response)
    if (response.data.length) {
        dispatch({
            type: 'ALL_IMAGES_PRODUCT',
            payload: response.data
        })
    }
    else {
        dispatch({
            type: 'ALL_IMAGES_PRODUCT',
            payload: []
        })
    }

}



// export const addProductToCart= (user_id,prod_id,data) => async dispatch => {
   
//     // const data = {
//     //     "quantity":1,
//     //       "flag":0,
//     //        "gift":0
//     // }
//     const response = await axios.post(exportData.backenedURL + 'write/customer/cart/' + user_id + '/'+ prod_id, data, {
//         headers: {
//            'Accept': 'application/json',
//            'Content-Type': 'application/json',
//         }
//     });
//     console.log(response)
//     if (response.status === 200) {
//         dispatch({
//             type: 'ADD_PRODUCT_CART',
//             payload: response.data
//         })
//     }
//     else {
//         dispatch({
//             type: 'ADD_PRODUCT_CART',
//             payload: []
//         })
//     }

// }


