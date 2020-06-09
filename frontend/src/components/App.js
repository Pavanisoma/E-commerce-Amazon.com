import React from 'react';

import cart from './clientComponents/cartComp/cart';

//import header from './clientComponents/orders/orderHeader';
import Orders from './clientComponents/orders/orders';
import CancelledOrders from './clientComponents/orders/cancelledOrders';
import OpenOrders from './clientComponents/orders/openOrders';
import OrderDetails from './clientComponents/orders/orderDetails';
import CancelOrder from './clientComponents/orders/cancelOrder';
import OrderStatus from './clientComponents/orders/orderStatus';

import ManageAddresses from './clientComponents/address/ManageAddresses';
import AddAddress from './clientComponents/address/AddAddress';
import EditAddress from './clientComponents/address/EditAddress';
import ManageCards from './clientComponents/cards/ManageCards';
import AddCard from './clientComponents/cards/AddCard';
import EditCard from './clientComponents/cards/EditCard';
import CustomerProfile from './clientComponents/profile/Profile';
import ViewCustomerProfile from './clientComponents/profile/ViewProfile';
import Checkout from './clientComponents/checkout/Checkout';
// client prodcts realted flows
import UserHome from './clientComponents/userHome/userHome';
import ProductDetails from './clientComponents/products/productDetailsPage';



//Seller Components
import SellerOrders from './sellerComponents/orders/orders';
import SellerCancelledOrders from './sellerComponents/orders/cancelledDelivered';
import SellerOpenOrders from './sellerComponents/orders/open';
import SellerProfile from './sellerComponents/profile/Profile';
import ViewSellerProfile from './sellerComponents/profile/ViewProfile';
import AddProduct from './sellerComponents/product/AddProduct';
import SellerHome from './sellerComponents/sellerHome/sellerHome';
import CancelOrderSeller from './sellerComponents/orders/cancelOrder';
import OrderStatusSeller from './sellerComponents/orders/orderStatus';
import OrderDetailsSeller from './sellerComponents/orders/orderDetails';
import SellerHeader from './sellerComponents/sellerHeader/sellerHeader';
import Reports from './sellerComponents/reports/reports';
import Inventory from './sellerComponents/inventory/inventory';
import UpdateProduct from './sellerComponents/inventory/updateProduct';
//Admin Components
import AdminOrders from './adminComponents/orders/orders';
import Analytics from './adminComponents/analytics/analytics';
import SellerList from './adminComponents/sellerTab/seller';
import SellerInfo from './adminComponents/sellerTab/sellerInfo';
import AdminInventory from './adminComponents/inventory/adminInventory';
import AdminHeader from './adminComponents/adminHeader/header';

import { BrowserRouter as Router, Route } from 'react-router-dom';

// Common components 
import SignUp from './SignUp/SingUp';
import SignIn from './Login/SingIn';
import Home from './Home';
import Unauthorised from './unauthorised/unauthorised';




const App = () => {
  return (
    <Router>
      <div>
      <Route exact path='/' component={Home} />
      </div>
      <div>
      <Route path='/unauthorised' component={Unauthorised} />

         <Route path='/signup' component={SignUp} />
         <Route path='/signin' component={SignIn} />
         <Route path='/userHome' component={UserHome} />
        <Route path='/user/Productdetails' component={ProductDetails} />

        
        <Route path='/user/cart/' component={cart} />
        <Route path='/user/orders/details/' component={OrderDetails} />
        <Route exact path='/user/orders/' component={Orders} />

        <Route path='/user/orders/cancelOrder/' component={CancelOrder} />
        <Route exact path='/user/open/' component={OpenOrders} />
        <Route path='/user/cancelled/' component={CancelledOrders} />
        <Route path='/user/orders/orderStatus/' component={OrderStatus} />

        <Route path='/user/address/manageAddresses/' component={ManageAddresses} />
        <Route path='/user/address/addAddress/' component={AddAddress} />
        <Route path='/user/address/editAddress/' component={EditAddress} />
        <Route path='/user/cards/manageCards/' component={ManageCards} />
        <Route path='/user/cards/addCard/' component={AddCard} />
        <Route path='/user/cards/editCard/' component={EditCard} />
        <Route path='/user/profile/' component={CustomerProfile} />
        <Route path='/user/viewProfile/' component={ViewCustomerProfile} />
        <Route path='/user/checkout/' component={Checkout} />

        <Route path='/sellerHome' component={SellerHome} />
        {/* <Route path='/seller' component={SellerHeader} /> */}
        <Route exact path='/seller/orders/' component={SellerOrders} />
        <Route path='/seller/product/addProduct' component={AddProduct} />
        <Route path='/seller/cancelledDelivered/' component={SellerCancelledOrders} />
        <Route path='/seller/open/' component={SellerOpenOrders} />
        <Route exact path='/seller/profile/' component={SellerProfile} />
        <Route exact path='/seller/viewProfile/' component={ViewSellerProfile} />
        <Route path='/seller/orders/cancelOrder/' component={CancelOrderSeller} />
        <Route path='/seller/orders/orderStatus/' component={OrderStatusSeller} />
        <Route path='/seller/orders/details/' component={OrderDetailsSeller} />
        <Route path='/seller/reports/' component={Reports} />
        <Route exact path='/seller/inventory/' component={Inventory} />
        <Route path='/seller/inventory/update/' component={UpdateProduct} />



        <Route path='/admin' component={AdminHeader} />
        <Route exact path='/admin/orders/' component={AdminOrders} />
        <Route exact path='/admin/analytics/' component={Analytics} />
        <Route exact path='/admin/sellers/' component={SellerList} /> 
        <Route exact path='/admin/sellers/sellerInfo' component={SellerInfo} /> 
        <Route exact path='/admin/inventory/' component={AdminInventory} /> 

        



  
      </div>

    </Router>
  )
}

export default App;
