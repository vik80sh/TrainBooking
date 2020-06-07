import React, { Component } from 'react'
import { withRouter } from "react-router";
import { connect } from "react-redux";

import { loginAction, logOutAction, adminLogin } from './../../ReactAction/login.action'

import WebsiteLogo from './../../Atoms/WebsiteLogo/websitelogo'
import SignUpLogin from './../Signup-Login/form-S-L';

import './header.scss'

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            isLogin: false,
            name: "",
            nameTitle: "",
            isAdmin: false
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.loginReducer.isLogin) {
            let name = nextProps.loginReducer.name
            if (name.length > 6)
                name = name.substring(0, 5) + "..."
            this.setState({ isLogin: true, name: name, nameTitle: nextProps.loginReducer.name })
        } else {
            this.setState({ isLogin: false, name: "", nameTitle: "", isAdmin: false })
        }
        if (nextProps.loginReducer.isAdmin)
            this.setState({ isAdmin: true })
    }
    handleModal = () => {
        this.setState({ show: !this.state.show })
    }
    loginFunction = () => {
        this.props.logOutAction()
    }
    userLogin = (data, isAdmin) => {
        if (isAdmin)
            this.props.adminLogin(data)
        else
            this.props.loginAction(data)
        this.handleModal()
    }
    render() {
        return (
            <div className="section-head header-wrapper ">
                <div className="logo" onClick={() => this.props.history.push("/")}><WebsiteLogo /></div>
                {this.state.isLogin &&<i className="fa fa-shopping-cart cart" aria-hidden="true" onClick={() => this.props.history.push("/cart")}></i>}
                {this.state.isAdmin && <i class="fa fa-train train" aria-hidden="true"  onClick={() => this.props.history.push("/addtrain")}></i>}
                <div className="login">
                    <span className="user-name" title={this.state.nameTitle}>{this.state.name}</span>
                    <span className="login-singup">
                        {this.state.isLogin ? <span onClick={this.loginFunction}>Logout</span>
                            : <span onClick={this.handleModal}>Login</span>}
                    </span>

                </div>
                {this.state.show && <SignUpLogin handleModal={this.handleModal} userLogin={(data, admin) => this.userLogin(data, admin)} />}
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        loginReducer: state.loginReducer
    };
};

export default connect(mapStateToProps, { loginAction, logOutAction, adminLogin })(withRouter(Header))

