import React, { Component } from 'react'
import {ToFromForm } from './../../Molecules/ToFromForm/toFrom'
import train from './../../Assets/image/train.jpg';
import './home.scss';
import MarqueeTag from '../../Atoms/MarqueTag/marqueTag';

export default class Home extends Component {
    render() {
        return (
            <div className="home-wrapper background-image-section" style={{backgroundImage:`url(${train})`}}>
               <MarqueeTag simpleText="Developed By" boldText="Vikash Gupta"/>
               <ToFromForm/>
            </div>
        )
    }
}
