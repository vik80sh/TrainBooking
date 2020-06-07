
import React from 'react';

import './searchBox.scss';

const BasicSearchBox = ({ classNameValue, type, name, placeholder, onChangeFuntion, value }) =>
    <div className="search-box">
        <input className={classNameValue} type={type} name={name} placeholder={placeholder} value={value} onChange={onChangeFuntion} />
    </div>

export default BasicSearchBox;