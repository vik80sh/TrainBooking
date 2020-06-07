import React, { useState } from 'react';
import BasicTextFields from './../../Atoms/InputField/basicInputField'
import ErrorMessage from './../../Atoms/ErrorMessage/errorMessage'

import { HelpersFunction } from './../../helperFunction';

import './index.scss'

const SignUpLogin = (props) => {

  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [login, setLogin] = useState(true)

  const toggle = (type) => {
    if (type === "login" && !login)
      setLogin(true)
    if (type === "sign" && login)
      setLogin(false)
  }
  const handleChange = (e) => {
    setErrorMessage('')
    if (e.target.name === "name")
      setName(e.target.value)
    else if (e.target.name === "username")
      setUsername(e.target.value)
    else if (e.target.name === "password")
      setPassword(e.target.value)
    else if (e.target.name === "confirmPassword")
      setConfirmPassword(e.target.value)
  }
  const submitForm = async (type) => {
    let data = ""
    let isAdmin=false
    if (type === "sign") {
      if (name === "") {
        setErrorMessage("Please Enter Your Name")
        return;
      }
      if (username.length < 5) {
        setErrorMessage("Username should be least 5 char long")
        return;
      }
      let passwordRgx = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{5,})");
      if (!password.match(passwordRgx)) {
        setErrorMessage("Please use least 5 char, 1 lowercase, 1 uppercase, 1 numeric and 1 speacial char")
        return;
      }
      if (password !== confirmPassword) {
        setErrorMessage("confirm Password is not matching")
        return;
      }
      
      let body = {
        name: name,
        username: username,
        password: password,
      }
       data = await HelpersFunction.userRegistration(body)
    }
    if (type === "login" || type === "adminlogin") {
      if (password !== "" && username === "") {
        setErrorMessage("Please Enter username and Password")
        return;
      }
      let body = {
        username: username,
        password: password,
      }
      
      if (type === "login") {
         data = await HelpersFunction.userLogin(body)
      } else {
         data = await HelpersFunction.adminLogin(body)
         isAdmin=true
      }
      if(data && data.message)
        setErrorMessage(data.message)
      else {
        props.userLogin(data,isAdmin)
      }
      return;
    }
    setErrorMessage(data.message)
  }
  return <div className="popup" >
    <div className="popup_inner">
      <div className="form-header">
        <span className={login ? "active form-login" : "form-login"} onClick={() => toggle("login")}>Login</span>
        <span className={!login ? "active form-sign" : "form-login"} onClick={() => toggle("sign")}>Signup</span>
        <span className="btn btn-danger btn-close" onClick={props.handleModal}>X</span>
      </div>
      <ErrorMessage text={errorMessage} />
      {login ? <div className="login xyz">
        <p><BasicTextFields label="Username" name="username" type="text" onChange={handleChange} /></p>
        <p><BasicTextFields label="Password" name="password" type="text" onChange={handleChange} /></p>
        <p className="login-btn-contenter">
          <button className="btn btn-primary loginbtn" onClick={() => submitForm('login')}>Login</button>
          <button className="btn btn-secondary loginbtn admin-btn" onClick={() => submitForm('adminlogin')}>Admin - Login</button>
        </p>

      </div> :
        <div className="signup xyz">
          <p><BasicTextFields label="Name" name="name" type="text" onChange={handleChange} /></p>
          <p><BasicTextFields label="Username" name="username" type="text" onChange={handleChange} /></p>
          <p><BasicTextFields label="Password" name="password" type="text" onChange={handleChange} /></p>
          <p><BasicTextFields label="Confirm Password" name="confirmPassword" type="text" onChange={handleChange} /></p>
          <p className="login-btn-contenter"><button className="btn btn-primary loginbtn" onClick={() => submitForm('sign')}>SignUp</button></p>
        </div>}
    </div>
  </div>
}

export default SignUpLogin