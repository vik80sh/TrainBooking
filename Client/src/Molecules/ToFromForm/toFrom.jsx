import React, { useState } from 'react'
import { useHistory } from "react-router";

import BasicTextFields from './../../Atoms/InputField/basicInputField'
import ErrorMessage from './../../Atoms/ErrorMessage/errorMessage'
import sImage from './../../Assets/Icons/SLocation.png'
import dImage from './../../Assets/Icons/DLocation.png'
import './toFrom.scss'

export const ToFromForm = () => {
    const history = useHistory();
    const [source, setSource] = useState('')
    const [destination, setDestination] = useState('')
    const [sourceError, setSourceError] = useState('')
    const [destinationError, setDestinationError] = useState('')

    const onChangeHandler = (data) => {
        if (data.target.name === 'from') {
            setSourceError('')
            setSource(data.target.value)
        }
        else {
            setDestinationError('')
            setDestination(data.target.value)
        }
        if (destinationError === "Source Station and Destination Station Should be Same")
            setDestinationError('')

    }
    const _onBlur = (data) => {
        if (data.target.name === 'from' && source === '')
            setSourceError("Source Station is  Required")
        if (data.target.name === 'to' && destination === '')
            setDestinationError("Destination Station is Required")
    }
    const findTrain = (data) => {
        if (data === 's-d') {
            if(source==="" || destination==""){
                if(source===""){
                    setSourceError("Source Station is  Required")
                    return ;
                }
                setDestinationError("Destination Station is Required")
                return ;
            }
            if (source === destination) {
                setDestinationError("Source Station and Destination Station Should be Same")
                return;
            }
            history.push({
                pathname:  `/search-train/${source}/${destination}`,
             })
        }else{
            history.push({
                pathname:  `/search-train/all/all`
             })
        }

    }
    return (
        <div className="s-d-wrapper">
            <div className="input-fields">
                <div className="heading-desktop">
                    Book
                    <p>Your Ticket</p>
                </div>
                <div className="source">
                    <img src={sImage} alt="destination-image" /> <BasicTextFields type="text" name="from" label="FROM*" onChange={onChangeHandler} onBlur={_onBlur} />
                    <ErrorMessage text={sourceError} />
                </div>
                <div className="destination">
                    <img src={dImage} alt="destination-image" /> <BasicTextFields type="text" name="to" label="TO*" onChange={onChangeHandler} onBlur={_onBlur} />
                    <ErrorMessage text={destinationError} />
                </div>
            </div>
            <div className="find-train">
                <button className="btn btn-secondary" onClick={() => findTrain('s-d')}>Find Trains</button>
                <button className="btn btn-success" onClick={() => findTrain('all')}>All Trains</button>
            </div>
        </div>
    )
}