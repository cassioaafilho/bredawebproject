import { Meteor } from 'meteor/meteor';
import React from 'react';
import { render } from 'react-dom';
import { Component } from 'react';
import styles from '/imports/ui/stylesheets/base-layout'

export default class BaseLayout extends Component {
    toggleDrawer(event) {
        event.preventDefault();
        document.getElementsByClassName('drawer')[0].classList.toggle('active');
    };

    render() {
        return (
            <div className="layout">
                <div className="navbar">
                    <i className="menu-icon material-icons" onClick={this.toggleDrawer}>menu</i>
                    <img className="logo" src="/images/logo_white.png"/>
                    <div className="vertical-divider"></div>
                    <div className="title">(Current Page)</div>
                    <div className="search-bar">
                        <i className="search-icon material-icons">search</i>
                        <input className="search-input" type="search" placeholder="Search"/>
                    </div>
                    <div className="auth-status">(Auth Status)</div>
                </div>
                <div className="page-content">
                    <div className="drawer">

                    </div>
                    {this.props.children}
                </div>
            </div>
        )
    }
};