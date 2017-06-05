import { Meteor } from 'meteor/meteor';
import React from 'react';
import { render } from 'react-dom';
import { browserHistory } from 'react-router';
import { Component } from 'react';
import styles from '/imports/ui/stylesheets/loading'

export default class Loading extends Component {
    render() {
        return (
            <div className="loading">
                <img src="/images/loading.gif"/>
            </div>
        );
    };
};