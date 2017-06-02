import { Meteor } from 'meteor/meteor';
import React from 'react';
import { render } from 'react-dom';
import { browserHistory } from 'react-router';
import { Component } from 'react';
import styles from '/imports/ui/stylesheets/base-layout'

export default class BaseLayout extends Component {

    // Lifecyle handlers
    componentDidMount() {
        componentHandler.upgradeDom();
    }
    componentDidUpdate() {
        componentHandler.upgradeDom();
    }

    // UI helpers
    whereAmI(location) {
        if (location == "/") return "Home";
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
    goLogin(event) {
        event.preventDefault();
        browserHistory.push('/login');
    };
    logout(event) {
        event.preventDefault();
        Meteor.logout((error) => {
            if (error) document.getElementById('snackbar').MaterialSnackbar.showSnackbar({ message: error });
            else browserHistory.push('/login');
        });
    }

    render() {
        return (
            <div className="layout">
                <div className="navbar">
                    <i className="menu-icon material-icons" onClick={this.toggleDrawer}>menu</i>
                    <img className="logo" src="/images/logo_white.png" />
                    <div className="vertical-divider"></div>
                    <div className="title">{this.whereAmI(this.props.location.pathname)}</div>
                    <div className="search-bar">
                        <i className="search-icon material-icons">search</i>
                        <input className="search-input" type="search" placeholder="Search" />
                    </div>
                    {Meteor.user() ? (
                        <div className="auth-status">
                            <div key="profile-avatar" id="profile-avatar" className="profile-avatar">{Meteor.user().emails[0].address.slice(0, 2)}</div>
                            <ul key="mdl-menu" className="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect" htmlFor="profile-avatar">
                                <li className="mdl-menu__item" onClick={this.logout}>
                                    <i className="material-icons">exit_to_app</i>
                                    Sign out
                                </li>
                            </ul>
                        </div>
                    ) : (
                            <div className="auth-status">
                                <button key="sign-in-button" className="sign-in-button mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect" onClick={this.goLogin}>Sign in</button>
                            </div>
                        )}
                </div>
                <div className="page-content">
                    <div className="drawer">
                        <div className="drawer-link" onClick={this.goHome}>
                            <i className="drawer-link-icon material-icons">home</i>
                            <div className="drawer-link-name">Home</div>
                        </div>
                        <div className="drawer-divider"></div>
                    </div>
                    {this.props.children}
                </div>
            </div>
        )
    }
};