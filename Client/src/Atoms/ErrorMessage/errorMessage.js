import React  from 'react'
import './errorMessage.scss'

const ErrorMessage = ({text}) =>
    <div className="error-wrapper" >
        {text}
    </div>;

export default ErrorMessage;
