
export const customerOrdersReducer = (state = [], action)=> {
    // console.log(action.payload)
     switch(action.type){
         case 'CUSTOMER_ORDERS':
             return action.payload
         
             default:
                 return state
 
     }
 }