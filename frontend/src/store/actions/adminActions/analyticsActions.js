import axios from 'axios';

import exportData from '../../../config/config';

export const getCartProducts = (user_id) => async dispatch => {

    const response = await axios.get(exportData.backenedURL + 'read/customer/cart/' + user_id);
    console.log(response)

  

}