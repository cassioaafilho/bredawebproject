import { Meteor } from 'meteor/meteor';
import React from 'react';
import { render } from 'react-dom';
import { browserHistory } from 'react-router';
import { Component } from 'react';
import styles from '/imports/ui/stylesheets/login-join';

export default class Join extends Component {

    // Lifecyle handlers
    componentWillMount() {
        this.setState({
            email: '',
            password: '',
            confirmPassword: ''
        });
    }
    componentDidMount() {
        componentHandler.upgradeDom();
        document.getElementById('email').parentElement.classList.remove('is-invalid');
        document.getElementById('password').parentElement.classList.remove('is-invalid');
        document.getElementById('confirm-password').parentElement.classList.remove('is-invalid');
    }

    // Routing handlers
    goLogin(event) {
        event.preventDefault();
        browserHistory.push('/login');
    }

    // Event handlers
    onJoinSubmit(event) {
        event.preventDefault();
        if (this.state.password == this.state.confirmPassword) {
            Accounts.createUser({
                email: this.state.email,
                password: this.state.password
            }, (error) => {
                if (error) document.getElementById('snackbar').MaterialSnackbar.showSnackbar({ message: error });
                else {
                    Meteor.loginWithPassword({ email: this.state.email }, this.state.password, (err) => {
                        if (err) document.getElementById('snackbar').MaterialSnackbar.showSnackbar({ message: err });
                        else browserHistory.push('/');
                    });
                }
            });
        }
        else document.getElementById('snackbar').MaterialSnackbar.showSnackbar({ message: 'The passwords don\'t match' });
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
    onConfirmPasswordChange(event) {
        this.setState({
            confirmPassword: event.target.value
        });
    };

    render() {
        return (
            <div className="login-join">
                <div className="login-join-card">
                    <img className="login-join-card-logo" src="/images/logo_black.png" />
                    <div className="card-title">
                        Create an account
                    </div>
                    <div className="card-subtitle">
                        using the form below
                    </div>
                    <form onSubmit={this.onJoinSubmit.bind(this)}>
                        <div className="form-input mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                            <input className="mdl-textfield__input" value={this.state.email} onChange={this.onEmailChange.bind(this)} type="email" id="email" required />
                            <label className="mdl-textfield__label" htmlFor="email">Email</label>
                        </div>
                        <div className="form-input mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                            <input className="mdl-textfield__input" value={this.state.password} onChange={this.onPasswordChange.bind(this)} type="password" id="password" required />
                            <label className="mdl-textfield__label" htmlFor="password">Password</label>
                        </div>
                        <div className="form-input mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                            <input className="mdl-textfield__input" value={this.state.confirmPassword} onChange={this.onConfirmPasswordChange.bind(this)} type="password" id="confirm-password" required />
                            <label className="mdl-textfield__label" htmlFor="confirm-password">Confirm Password</label>
                        </div>
                        <div className="card-actions">
                            <div id="more-options" className="action-link">More options</div>
                            <ul className="mdl-menu mdl-menu--bottom-left mdl-js-menu mdl-js-ripple-effect" htmlFor="more-options">
                                <li className="mdl-menu__item" onClick={this.goLogin}>Sign in</li>
                            </ul>
                            <button className="action-button mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect">Create</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
};