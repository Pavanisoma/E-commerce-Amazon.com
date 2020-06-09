import React from 'react';

import Menu from '../Menu/menu';
import CategoryList from '../Menu/categoryList';

const Header = () => {
    return (
        <div>
            <Menu />
          <CategoryList/>
        </div>
    );
}

export default Header;