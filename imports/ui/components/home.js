import { Meteor } from 'meteor/meteor';
import React from 'react';
import { render } from 'react-dom';
import { browserHistory } from 'react-router';
import { Component } from 'react';
import styles from '/imports/ui/stylesheets/home';

export default class Home extends Component {

    // Event helpers
    addHall(event) {
        event.preventDefault();
        browserHistory.push('/add-hall');
    }
    book(event) {
        event.preventDefault();
        alert('booking hall: ' + event.currentTarget.parentNode.id);
    }
    askQuestion(event) {
        event.preventDefault();
        alert('asking question for hall: ' + event.currentTarget.parentNode.id);
    }

    render() {
        let halls = [];
        this.props.halls.forEach(hall => {
            halls.push(
                <div key={hall._id} className="hall-card">
                    <img className="hall-card-image" src={hall.imageURL} />
                    <div className="hall-card-title">{hall.title}</div>
                    <div className="hall-card-phone">Phone: {hall.phone}</div>
                    <div className="hall-card-address">Address: {hall.address}</div>
                    <div className="hall-card-price">Price: {hall.price}</div>
                    <div className="hall-card-description">{hall.description}</div>
                    <div id={hall._id} className="hall-card-actions">
                        <button className="action-button mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect" onClick={this.book.bind(this)}>Book</button>
                        <button className="action-button mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect" onClick={this.askQuestion.bind(this)}>Ask a question</button>
                    </div>
                </div>
            );
        });
        return (
            <div className="home">
                {/*<div className="hall-card">
                    <img className="hall-card-image" src="/images/halls/four_seasons.jpg" />
                    <div className="hall-card-title">The four seasons</div>
                    <div className="hall-card-phone">Phone: +1 212-758-5700</div>
                    <div className="hall-card-address">Address: 57 E 57th St, New York</div>
                    <div className="hall-card-price">Price: USD 1500.00/day</div>
                    <div className="hall-card-description">Spatious and with beutiful architecture, the four seasons is just the right place for your special event.</div>
                    <div className="hall-card-actions">
                        <button className="action-button mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect">Book</button>
                        <button className="action-button mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect">Ask a question</button>
                    </div>
                </div>*/}
                {halls}
                <button className="floating-button mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored" onClick={this.addHall.bind(this)}>
                    <i className="material-icons">add</i>
                </button>
            </div>
        )
    }
};