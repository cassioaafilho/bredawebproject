import { Meteor } from 'meteor/meteor';
import React from 'react';
import { render } from 'react-dom';
import { Component } from 'react';

export default class BaseLayout extends Component {
    render() {
        return (
            <div>
                <h1>layout</h1>
                <div>{this.props.children}</div>
            </div>
        )
    }
};