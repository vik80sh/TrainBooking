import React, { Component } from 'react'
import { connect } from "react-redux";
import { withRouter } from "react-router";

import BasicTextFields from './../../Atoms/InputField/basicInputField';
import MarqueeTag from '../../Atoms/MarqueTag/marqueTag';

import ticket from './../../Assets/image/ticket.png';
import ErrorMessage from './../../Atoms/ErrorMessage/errorMessage';
import { HelpersFunction } from './../../helperFunction';

import './addTrain.scss'


class AddTrain extends Component {
    state = {
        trainName: "",
        trainNumber: "",
        price: 0,
        to: "",
        from: "",
        ErrorMessage:"",
        successMessage:""
    }
    componentDidMount() {
        // if(!this.props.loginReducer.isAdmin){
        //     this.props.history.push('/')
        // }
    }
    handleChange = (e) => {

        this.setState({ [e.target.name]: e.target.value,ErrorMessage:"",successMessage:""})
    }
    addTrain = async() => {
        let {
            trainName,
            trainNumber,
            price,
            to,
            from
        } = this.state
        if (trainName === "" || trainNumber === "" ||
            price <= 0 || to === "" || from === ""){
                this.setState({ErrorMessage:"Please enter all the fields and Price should be greater than 0"})
                return;
            }
        if(to===from){
            this.setState({ErrorMessage:"Source and Destination should be different"})
            return;
        }
        if(trainNumber.length!==5){
            this.setState({ErrorMessage:"Train Number should be 5 character "})
            return;
        }
        let data = await HelpersFunction.addTrain(this.state) 
        if(data&&data.id)
            this.setState({ErrorMessage:"Succefully inserted in database",trainName:"",trainNumber:"",to:"",from:"",price:0})
        else if(data&&data.message)
            this.setState({ErrorMessage:data.message})
    }
    render() {
        let stateValue= this.state;
        return (
            <div className="background-image-section" style={{ backgroundImage: `url(${ticket})` }}>
                <MarqueeTag simpleText="Developed By" boldText="Vikash Gupta" />
                <div className="add-train-wrapper">
                    <div className="add-train"> Hey Vikash, Please add Train in Database</div>
                    <ErrorMessage text={this.state.ErrorMessage}/>
                    <div className="train-name">
                        <BasicTextFields label="Train Name" name="trainName" type="text" value={stateValue.trainName}onChange={this.handleChange} />
                    </div>
                    <div className="train-number">
                        <BasicTextFields label="Train Number (Length should be 5)" name="trainNumber"   value={stateValue.trainNumber} type="text" onChange={this.handleChange} />
                    </div>
                    <div className="train-number">
                        <BasicTextFields label="FROM" name="from" type="text" value={stateValue.from} onChange={this.handleChange} />
                        <BasicTextFields label="TO" name="to" type="text" value={stateValue.to} onChange={this.handleChange} />
                    </div>
                    <div className="ticket-price">
                        <BasicTextFields label="Ticket Price" name="price" value={stateValue.price} type="number" onChange={this.handleChange} />
                    </div>
                    <div className="submit-btn">
                        <button className="btn btn-info" onClick={this.addTrain}>Add Train</button>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loginReducer: state.loginReducer
    };
};

export default connect(mapStateToProps, {})(withRouter(AddTrain))

