
import React from 'react';
import './searchBox.scss';

const BasicSearchBox = ({ classNameValue, type, name, placeholder, onChange, value }) =>
    <div className="search-box">
        <input className={classNameValue} type={type} name={name} placeholder={placeholder} value={value} onChange={onChange} />
    </div>

export default BasicSearchBox;