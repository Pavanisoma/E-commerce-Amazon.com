
export const adminOrdersReducer = (state = [], action)=> {
     switch(action.type){
         case 'ADMIN_ORDERS':
             return action.payload
         
             default:
                 return state
 
     }
 }
 
 export const totalSellerReducer = (state = [], action)=> {
     switch(action.type){
         case 'TOTAL_SELLERS':
             return action.payload
         
             default:
                 return state
 
     }
 }