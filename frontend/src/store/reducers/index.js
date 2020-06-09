import { combineReducers } from 'redux';
import { cartProductsReducer,saveLaterProductsReducer } from './clientReducers/cartReducers'
import { customerOrdersReducer } from './clientReducers/orderReducers';
import {allProductsReducer, allProductDetailsReducer, allCommentsForProductReducer,allProductsBySellerReducer,allimageDetailsReducer} from './clientReducers/productsReducers';
import {LoginReducer, SignUpReducer} from './loginReducers';
import { sellerOrdersReducer } from './sellerReducers/orderReducers';
import { adminOrdersReducer, totalSellerReducer } from './adminReducers/orderReducer';

export default combineReducers({
    cartProducts:cartProductsReducer,
    saveLaterProducts:saveLaterProductsReducer,
    customerOrders:customerOrdersReducer,

     allProducts: allProductsReducer,
     ProductDetails:allProductDetailsReducer,
     allComments :allCommentsForProductReducer,
    allImages:allimageDetailsReducer,
     allSellerProducts:allProductsBySellerReducer,
     loginDetails:LoginReducer,
     SignUpTrue:SignUpReducer,

     sellerOrders:sellerOrdersReducer,

     //admin reducers
     adminOrders:adminOrdersReducer,
     totalSellers:totalSellerReducer


})