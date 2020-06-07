import React, { Component } from 'react'
import { Route, Switch } from "react-router-dom";
import Header from './Molecules/Header/header'
import Home from './Components/Home/home';
import AddTrain from './Components/AddTrain/addTrain'
import TrainSearch from './Components/TrainSearch/trainSearch';
import History from './Components/Histroy/history';

const NotFound = () => <div>Not found</div>

export default class Layout extends Component {
    render() {
        return (
            <div className="layout-router-wrapper">
                <Header />
                <div className="parent-wrapper">
                    <Switch>
                        <Route path="/" exact component={Home} />
                        <Route path="/addtrain" component={AddTrain} />
                        <Route path="/history" component={History} />
                        <Route path="/search-train/:id/:id" component={TrainSearch} />
                        
                        <Route component={NotFound} />
                    </Switch>
                </div>

            </div>
        )
    }
}

