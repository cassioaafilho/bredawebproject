import { Meteor } from 'meteor/meteor';
import React from 'react';
import { render } from 'react-dom';
import { browserHistory } from 'react-router';
import { Component } from 'react';
import styles from '/imports/ui/stylesheets/base-layout'

export default class BaseLayout extends Component {
    
    // UI helpers
    whereAmI(location) {
        if(location == "/") return "Home";
        else return "Unknown";
    }

    // UI animations
    toggleDrawer(event) {
        event.preventDefault();
        document.getElementsByClassName('drawer')[0].classList.toggle('inactive');
    };

    // Links
    goHome(event) {
        event.preventDefault();
        browserHistory.push('/');
    };
    goMyHallz(event) {
        event.preventDefault();
        browserHistory.push('/my-hallz');
    };
    goMyProfile(event) {
        event.preventDefault();
        browserHistory.push('/profile');
    };
    goNotifications(event) {
        event.preventDefault();
        browserHistory.push('/notifications');
    };
    goSettings(event) {
        event.preventDefault();
        browserHistory.push('/settings');
    };
    goHelp(event) {
        event.preventDefault();
        browserHistory.push('/help');
    };

    render() {
        return (
            <div className="layout">
                <div className="navbar">
                    <i className="menu-icon material-icons" onClick={this.toggleDrawer}>menu</i>
                    <img className="logo" src="/images/logo_white.png"/>
                    <div className="vertical-divider"></div>
                    <div className="title">{this.whereAmI(this.props.location.pathname)}</div>
                    <div className="search-bar">
                        <i className="search-icon material-icons">search</i>
                        <input className="search-input" type="search" placeholder="Search"/>
                    </div>
                    <div className="auth-status">(Auth Status)</div>
                </div>
                <div className="page-content">
                    <div className="drawer">
                        <div className="drawer-link" onClick={this.goHome}>
                            <i className="drawer-link-icon material-icons">home</i>
                            <div className="drawer-link-name">Home</div>
                        </div>
                        <div className="drawer-link" onClick={this.goMyHallz}>
                            <i className="drawer-link-icon material-icons">assessment</i>
                            <div className="drawer-link-name">My Hallz</div>
                        </div>
                        <div className="drawer-link" onClick={this.goMyProfile}>
                            <i className="drawer-link-icon material-icons">account_circle</i>
                            <div className="drawer-link-name">My Profile</div>
                        </div>
                        <div className="drawer-link" onClick={this.goNotifications}>
                            <i className="drawer-link-icon material-icons">home</i>
                            <div className="drawer-link-name">Notifications</div>
                        </div>
                        <div className="drawer-divider"></div>
                        <div className="drawer-link" onClick={this.goSettings}>
                            <i className="drawer-link-icon material-icons">settings</i>
                            <div className="drawer-link-name">Settings</div>
                        </div>
                        <div className="drawer-link" onClick={this.goHelp}>
                            <i className="drawer-link-icon material-icons">help</i>
                            <div className="drawer-link-name">Help</div>
                        </div>
                    </div>
                    {this.props.children}
                </div>
            </div>
        )
    }
};