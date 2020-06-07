import React, { Component } from 'react'
import { withRouter } from "react-router";

class Cart extends Component {
    componentDidMount(){
        let x = localStorage.getItem("token");
        if(x!=="123xyz"){
            this.props.history.push("/")
        }
    }
    render() {
        return (
            <div>
                <h2>User Cart Component</h2>
            </div>
        )
    }
}

export default withRouter(Cart)