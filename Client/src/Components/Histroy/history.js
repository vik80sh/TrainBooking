import React, { Component } from 'react'
import { withRouter } from "react-router";
import { connect } from "react-redux";

import { HelpersFunction } from '../../helperFunction';
import ErrorMessage from './../../Atoms/ErrorMessage/errorMessage'

import './history.scss'

class Histrory extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoader: true,
            allDetails: [],
            errorMessage: ""
        }
    }
    componentDidMount() {
        if (!(this.props.loginReducer.isAdmin || this.props.loginReducer.isLogin)) {
            this.props.history.push("/")
        }
        this.bookingSummary()
    }
    componentWillReceiveProps(nextProps) {
        if (!(this.props.loginReducer.isAdmin || this.props.loginReducer.isLogin)) {
            this.props.history.push("/")
        } else {
            this.setState({ errorMessage: "" })
        }
    }
    bookingSummary = async () => {
        this.setState({ isLoader: true })
        let data = await HelpersFunction.allbookedticket();
        if (data && data.message)
            this.setState({ errorMessage: data.message, isLoader: false })
        else
            this.setState({ errorMessage: "", allDetails: data, isLoader: false })
    }
    cancelTikect = async (cancel) => {
        this.setState({ isLoader: true })
        cancel = {
            id: cancel._id
        }
        let data = await HelpersFunction.cancelTicket(cancel);
        if (data && data.message)
            this.setState({ errorMessage: data.message, isLoader: false })
        else
            this.bookingSummary()
    }
    render() {
        let bookingList = this.state.allDetails ? this.state.allDetails : [];

        return (
            <div className="history-wrapper">
                {this.state.isLoader && <div className="loader"></div>}
                <h2>Hi, {this.props.loginReducer.name}</h2>
                <ErrorMessage text={this.state.errorMessage} />
                <div className="booking-list">
                    {bookingList.length > 0 && bookingList.map((data, index) => {
                        let timeDiff = Math.abs((new Date(data.date)).getTime() - (new Date()).getTime());
                        let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
                        let isCancel = diffDays > 2 ? true : false;
                        return <div className="booking-name" key={index}>
                            <div className="train-name">
                                <span>Train Name : {data.trainName}</span>
                                <span>Train Number : {data.trainNumber}</span>
                            </div>
                            {data.bookingDetail.map((val, i) => {
                                return <div className="name" key={i}>
                                    <span>Name: {val.name}</span>
                                    <span>Age:{val.age}</span>
                                </div>
                            })}
                            <div className="button">
                                {
                                    isCancel ? <button className="btn btn-danger" onClick={() => this.cancelTikect(data)}>Cancel</button>
                                        : <span>You have to travel within 2 Days or Date is already passedcan't cancel this ticket, Please contact to admin</span>
                                }
                            </div>
                            <div className="date">Travelling Date : {data.date.substring(0, 10)}</div>
                            <div className="station-name">
                                <span>From : {data.from}</span>
                                <span>To : {data.to}</span>
                            </div>
                            <div className="price">Cost : {data.price}</div>

                        </div>
                    })}
                    {bookingList.length === 0 && this.state.errorMessage === "" && <div className="No-Tocket ">You Have Not Booked Any Ticket Yet</div>}
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

export default connect(mapStateToProps, {})(withRouter(Histrory))

