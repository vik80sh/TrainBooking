import React, { useState } from 'react'
import BasicTextFields from './../../Atoms/InputField/basicInputField'
import ErrorMessage from './../../Atoms/ErrorMessage/errorMessage'

import sImage  from './../../Assets/Icons/SLocation.png'
import dImage  from './../../Assets/Icons/DLocation.png'

import './toFrom.scss'

export const ToFromForm = () => {
    const [source, setSource] = useState('')
    const [destination, setDestination] = useState('')
    const [sourceError, setSourceError] = useState('')
    const [destinationError, setDestinationError] = useState('')

    const onChangeHandler = (data) => {
        setSourceError('')
        setDestinationError('')
     
    }
    const _onBlur = (data) => {
        if (data.target.name === 'from' && source === '')
            setSourceError("Station is ffff required")
        if (data.target.name === 'to' && destination === '')
            setDestinationError("Station is required")
    }
    return (
        <div className="s-d-wrapper">
            <div className="input-fields">
                <div className="heading-desktop">
                        Book 
                    <p>Your Ticket</p>
                </div>
                <div className="source">
                 <img src={sImage} alt="destination-image"/> <BasicTextFields type="text" name="from" label="FROM*" onChange={onChangeHandler} onBlur={_onBlur} />
                    <ErrorMessage text={sourceError} />
                </div>
                <div className="destination">
                   <img src={dImage} alt="destination-image"/> <BasicTextFields type="text" name="to" label="TO*" functionName={onChangeHandler} onBlur={_onBlur} />
                    <ErrorMessage text={destinationError} />
                </div>
            </div>
            <div className="find-train">
                <button className="btn btn-secondary">Find Train</button>
            </div>
        </div>
    )
}