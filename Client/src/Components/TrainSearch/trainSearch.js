import React, { Component } from 'react'
import { connect } from "react-redux";
import { withRouter } from "react-router";
import DatePicker from "react-datepicker";

import ErrorMessage from './../../Atoms/ErrorMessage/errorMessage'
import BasicSearchBox from '../../Atoms/SearchBoxInput/searchBox';
import BasicTextFields from './../../Atoms/InputField/basicInputField';

import { HelpersFunction } from '../../helperFunction';

import './trainSearch.scss'
import "react-datepicker/dist/react-datepicker.css";

class TrainSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoader: true,
            allTrainList: [],
            errorMessage: "",
            selectedTrain: "",
            searchResult: [],
            isTrainSelected: false,
            date: new Date(),
            userDetails: [],
            name:"",
            age:0,
            userDetailsError:""
        }
    }

    componentDidMount() {
        let s_d = this.props.location.pathname.split('/');
        if (s_d.length === 4)
            this.getTrain(s_d[2], s_d[3])
        else {
            console.log("redirect to home page")
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.loginReducer.isAdmin || nextProps.loginReducer.isLogin) {
            this.setState({ errorMessage: "" })
        }
    }
    getTrain = async (source, destination) => {
        this.setState({ isLoader: true })
        let data = await HelpersFunction.getTrainList(source, destination)
        if (data && data.messgae)
            this.setState({ errorMessage: "Something went wrong", isLoader: false })
        else
            this.setState({ allTrainList: data, searchResult: data, isLoader: false })

    }
    bookTrain = (data) => {
        if (this.props.loginReducer.isAdmin || this.props.loginReducer.isLogin)
            this.setState({ selectedTrain: data, isTrainSelected: true })

        else
            this.setState({ errorMessage: "Please Login"})

    }
    handleChange = (date) => {
        this.setState({ date: date, selectedTrain: "", isTrainSelected: false })
    }

    searchTrain = (e) => {
        this.debounce(this.autoSearch, 300, e.target.value);
    }
    debounce = (fn, delay, e) => {
        let timer;
        let x = this;
        clearTimeout(this.timer);
        this.timer = setTimeout(function () {
            x.autoSearch(e);
        }, 600);
    }
    autoSearch = (value) => {
        let searchResult = [];
        let allTrains = this.state.allTrainList
        if (value.length > 1)
            for (let i = 0; i < allTrains.length; i++) {
                let trainName = allTrains[i].trainName.toLowerCase();
                let index = trainName.indexOf(value.toLowerCase());
                if (index !== -1)
                    searchResult.push(allTrains[i]);
                else {
                    let trainNumber = allTrains[i].trainNumber.toLowerCase();
                    let index = trainNumber.indexOf(value.toLowerCase());
                    if (index !== -1)
                        searchResult.push(allTrains[i]);
                }
            }
        else searchResult = allTrains;
        this.setState({ searchResult, errorMessage: "" })
        if (searchResult.length == 0) {
            this.setState({ errorMessage: "No Result Found" })
        }
    }
    allTrain = () => {
        this.getTrain('all', 'all')
        this.setState({ selectedTrain: "", isTrainSelected: false })
        this.props.history.push({
            pathname: `/search-train/all/all`
        })
    }

    addUser=()=>{
        let data = {
            name:this.state.name,
            age:this.state.age
        }
        if(data.name=="" || data.age<0){
            this.setState({userDetailsError:"Please enter both the field age shoulbe be not be -Ve"})
            return 
        }
        this.setState({userDetails:[...this.state.userDetails,data],name:"",age:0,userDetailsError:""})
    }
    editUser=(e,index)=>{
        this.setState({userDetailsError:""})
        if(index===-1){
            this.setState({[e.target.name]:e.target.value})
        }else{
            let stateValue = this.state.userDetails;
            let edit = stateValue[index];
            if(e.target.name==='name')
                edit.name=e.target.value;
            else 
                edit.age=e.target.age;
            stateValue[index] = edit;
            this.setState({userDetails:stateValue})
        }
    }
    deleteUser=(index)=>{
        let stateValue = this.state.userDetails;
        let edit = stateValue[index];
        stateValue = stateValue.filter(data=>data!==edit)
        this.setState({userDetails:stateValue})
    }
    confirm = async (selected) => {
        if(this.state.userDetails.length===0){
            this.setState({userDetailsError:"Please enter user Details"})
            return;
        }
        selected.price = selected.price * this.state.userDetails.length;
        selected.userDetails = this.state.userDetails;
        selected.date = this.state.date;
        let data = await HelpersFunction.bookTrain(selected)
        if(data && data.messgae)
            this.setState({userDetailsError:"Please enter user Details"})
        else{
            this.setState({userDetailsError:"Successfully booked ticket",userDetails:[]})
        }

    }
    render() {
        let selectedTrain = this.state.selectedTrain;
        let userDetails = this.state.userDetails
        let numberOfUser = userDetails.length;
        return (
            <div className="search-train-wrapper">
                {this.state.isLoader && <div className="loader"></div>}
                <div className="all-train-btn"><button className="btn btn-warning" onClick={() => this.allTrain("all")}>See All Trains</button></div>
                <div className="select-date">
                    <span>Journey Date </span>
                    <DatePicker
                        className={['c1', 'c2']}
                        selected={this.state.date}
                        onChange={this.handleChange}
                        minDate={new Date()}
                        placeholderText="Select a day"
                    />
                </div>
                {!this.state.isTrainSelected ? <div className="all-train-list row">
                    <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3 train-search-container">
                        <BasicSearchBox type="text" name="search" placeholder="Type Train name or Number" onChange={this.searchTrain} />
                    </div>
                    <div className="col-xs-12 col-sm-12 col-md-8 col-lg-8 train-result">
                        <ErrorMessage text={this.state.errorMessage} />
                        {this.state.searchResult.map((data, index) => {
                            return <div className="col-xs-12 train-details col-md-12 col-lg-12" key={index}>
                                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 train-detail-container">
                                    <div className="train-name"><i className="fa fa-train train" aria-hidden="true" /> <span className="text-capitalize"> {data.trainName} </span> <span>({data.trainNumber})</span></div>
                                    <div className="train-s-d" className="text-capitalize">{data.from} =>{data.to}</div>
                                </div>
                                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 train-price-container">
                                    <div className="train-price col-xs-12 col-sm-12 col-md-5">RS {data.price}</div>
                                    <div className="train-book col-xs-12 col-sm-12 col-md-6" > <button className="btn btn-info" onClick={() => this.bookTrain(data)}>Book Now</button></div>
                                </div>
                            </div>
                        })}
                    </div>
                </div> :
                    <div className="selected-train">
                        <div><span><i className="fa fa-train train" aria-hidden="true" /> </span><span> {selectedTrain.trainName} </span> <span>({selectedTrain.trainNumber})</span>
                            <span>{selectedTrain.from} =>{selectedTrain.to}</span>
                            <span> RS {selectedTrain.price}</span>
                        </div>
                        <div className="userDetails">
                    <p> Add Deatils  <span> Total Price :  {numberOfUser >0 ? selectedTrain.price * numberOfUser : selectedTrain.price}</span> </p>
                           <ErrorMessage text={this.state.userDetailsError} />
                            {
                                userDetails.map((data, index) => {
                                    return <div className="user-list-wrapper">
                                        <BasicTextFields label="Name" name="Name" type="text" value={data.name} onChange={(e) => this.editUser(e, index)} />
                                        <BasicTextFields label="Age" name="Age" type="number" value={data.age} onChange={(e) => this.editUser(e, index)} />
                                        <i class="fa fa-trash" aria-hidden="true" onClick={() => this.deleteUser(index)}></i>
                                    </div>
                                })
                            }
                            <div className="user-list-wrapper">
                                <BasicTextFields label="Name" name="name" type="text" value={this.state.name}  onChange={(e) => this.editUser(e, -1)} />
                                <BasicTextFields label="Age" name="age" type="number" value={this.state.age} onChange={(e) => this.editUser(e, -1)} />
                                <span onClick={this.addUser}> + </span>
                            </div>
                        </div>
                        <button className="btn btn-info" onClick={() => this.confirm(selectedTrain)}>Confirm</button>
                    </div>
                }
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        loginReducer: state.loginReducer
    };
};

export default connect(mapStateToProps, {})(withRouter(TrainSearch))