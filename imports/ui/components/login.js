import { Meteor } from 'meteor/meteor';
import React from 'react';
import { render } from 'react-dom';
import { browserHistory } from 'react-router';
import { Component } from 'react';
import styles from '/imports/ui/stylesheets/login-join'

export default class Login extends Component {

    // Lifecyle handlers
    componentWillMount() {
        this.setState({
            email: '',
            password: ''
        });
    }
    componentDidMount() {
        componentHandler.upgradeDom();
        document.getElementById('email').parentElement.classList.remove('is-invalid');
        document.getElementById('password').parentElement.classList.remove('is-invalid');
    }

    // Routing handlers
    goHome(event) {
        event.preventDefault();
        browserHistory.push('/');
    };
    goJoin(event) {
        event.preventDefault();
        browserHistory.push('/join');
    }

    // Event handlers
    onLoginSubmit(event) {
        event.preventDefault();
        Meteor.loginWithPassword({ email: this.state.email }, this.state.password, (error) => {
            if (error) document.getElementById('snackbar').MaterialSnackbar.showSnackbar({ message: error });
            else browserHistory.push('/');
        });
    };
    onEmailChange(event) {
        this.setState({
            email: event.target.value
        });
    };
    onPasswordChange(event) {
        this.setState({
            password: event.target.value
        });
    };

    render() {
        return (
            <div className="login-join">
                <div className="login-join-card">
                    <img className="login-join-card-logo" src="/images/logo_black.png" />
                    <div className="card-title">
                        Sign in
                    </div>
                    <div className="card-subtitle">
                        with your Hallz account
                    </div>
                    <form onSubmit={this.onLoginSubmit.bind(this)}>
                        <div className="form-input mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                            <input className="mdl-textfield__input" value={this.state.email} onChange={this.onEmailChange.bind(this)} type="email" id="email" required/>
                            <label className="mdl-textfield__label" htmlFor="email">Email</label>
                        </div>
                        <div className="form-input mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                            <input className="mdl-textfield__input" value={this.state.password} onChange={this.onPasswordChange.bind(this)} type="password" id="password" required/>
                            <label className="mdl-textfield__label" htmlFor="password">Password</label>
                        </div>
                        <div className="card-actions">
                            <div id="more-options" className="action-link">More options</div>
                            <ul className="mdl-menu mdl-menu--bottom-left mdl-js-menu mdl-js-ripple-effect" htmlFor="more-options">
                                <li className="mdl-menu__item" onClick={this.goJoin}>Create account</li>
                                <li className="mdl-menu__item" onClick={this.goHome}>Go back</li>
                            </ul>
                            <button className="action-button mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect">Next</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
};