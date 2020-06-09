import axios from 'axios';

import exportData from '../../../config/config';


export const filteredSellers = (list) => {

    try {
        return ({
            type:'TOTAL_SELLERS',
            payload:list
        })
    }    
    catch (e) {
        console.log(e)
    }


}