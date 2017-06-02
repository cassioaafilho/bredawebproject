import { Meteor } from 'meteor/meteor';
import React from 'react';
import { render } from 'react-dom';
import { browserHistory } from 'react-router';
import { Component } from 'react';
import styles from '/imports/ui/stylesheets/hall'

export default class NotFound extends Component {

    // Links
    goHome(event) {
        event.preventDefault();
        browserHistory.push('/');
    };

    render() {
        return (
            <div className="hall">
                <h1>Oops!</h1>
                <img src="/images/404.jpg" onClick={this.goHome}/>
            </div>
        );
    };
};