
export const sellerOrdersReducer = (state = [], action)=> {
    // console.log(action.payload)
     switch(action.type){
         case 'SELLER_ORDERS':
             return action.payload
         
             default:
                 return state
 
     }
 }