
 import React from 'react';
 import TextField from '@material-ui/core/TextField';

 import  './basicInputField.scss';

const BasicTextFields = ({type,name,label,onChange,value,onBlur}) => 
        <TextField id="standard-basic" type={type} name ={name} label={label} value={value} onChange={onChange} onBlur={onBlur} />
export default BasicTextFields;