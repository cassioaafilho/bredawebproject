import { Meteor } from 'meteor/meteor';
import React from 'react';
import { render } from 'react-dom';
import { browserHistory } from 'react-router';
import { Component } from 'react';
import styles from '/imports/ui/stylesheets/add-hall'

export default class AddHall extends Component {

    // Links
    goHome(event) {
        event.preventDefault();
        browserHistory.push('/');
    };

    render() {
        return (
            <div className="add-hall">
                <div className="add-hall-form-frame"></div>
                <div className="add-hall-image-frame">
                    <img id="cropper" className="add-hall-image" src="no-image.jpg" />
                </div>
            </div>
        );
    };
};