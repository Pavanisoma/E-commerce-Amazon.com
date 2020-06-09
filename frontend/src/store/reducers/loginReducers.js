export const LoginReducer = (state = [], action)=> {
   console.log(action.payload)
     switch(action.type){
         case 'LOGIN':
             return action.payload
         
             default:
                 return state
 
     }
 }


 export const SignUpReducer = (state = [], action)=> {
   // console.log(action.payload)
     switch(action.type){
         case 'SIGNUP':
             return action.payload
         
             default:
                 return state
 
     }
 }


