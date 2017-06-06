import { Meteor } from 'meteor/meteor';
import React from 'react';
import { render } from 'react-dom';
import { browserHistory } from 'react-router';
import { Component } from 'react';
import styles from '/imports/ui/stylesheets/home';

export default class Home extends Component {

    // Event helpers
    removeHall(event) {
        event.preventDefault();
        const ids = event.target.id.split('_');
        Meteor.call('halls.delete', ids[0], ids[1], (error) => {
            if (error) document.getElementById('snackbar').MaterialSnackbar.showSnackbar({ message: error });
        });
    }
    addHall(event) {
        event.preventDefault();
        browserHistory.push('/add-hall');
    }
    unbook(event) {
        event.preventDefault();
        Meteor.call('halls.unbook', event.currentTarget.parentNode.id);
    }
    book(event) {
        event.preventDefault();
        if (!Meteor.user()) browserHistory.push('/login');
        else Meteor.call('halls.book', event.currentTarget.parentNode.id, (error) => {
            if (error) document.getElementById('snackbar').MaterialSnackbar.showSnackbar({ message: error });
        });
    }
    contact(event) {
        event.preventDefault();
        document.getElementById(event.currentTarget.parentNode.id + '_dialog').showModal();
    }
    closeDialog(event) {
        event.preventDefault();
        document.getElementById(event.currentTarget.parentNode.parentNode.parentNode.id + '_dialog').close();
    }
    askQuestion(event) {
        event.preventDefault();
        if (!Meteor.user()) browserHistory.push('/login');
        alert('asking question for hall: ' + event.currentTarget.parentNode.id, (error) => {
            if (error) document.getElementById('snackbar').MaterialSnackbar.showSnackbar({ message: error });
        });
    }

    render() {
        let halls = [];
        this.props.halls.forEach(hall => {
            if (this.props.search == '' ||
                hall.title.toLowerCase().indexOf(this.props.search.toLowerCase()) != -1 ||
                hall.phone.toLowerCase().indexOf(this.props.search.toLowerCase()) != -1 ||
                hall.address.toLowerCase().indexOf(this.props.search.toLowerCase()) != -1 ||
                hall.price.toLowerCase().indexOf(this.props.search.toLowerCase()) != -1 ||
                hall.description.toLowerCase().indexOf(this.props.search.toLowerCase()) != -1) {
                halls.push(
                    <div key={hall._id} className="hall-card">
                        {(() => {
                            if (hall.creator == Meteor.userId()) {
                                return (
                                    <div className="triangle"></div>
                                );
                            }
                        })()}
                        {(() => {
                            if (hall.creator == Meteor.userId()) {
                                return (
                                    <i id={hall._id + "_" + hall.image} className="hall-card-remove material-icons" onClick={this.removeHall}>close</i>
                                );
                            }
                        })()}
                        {(() => {
                            if (hall.booked) {
                                return (
                                    <img className="hall-card-image-overlay" src="/images/booked.png" />
                                );
                            }
                        })()}
                        <img className="hall-card-image" src={this.props.images.find(img => img._id == hall.image) ? this.props.images.find(img => img._id == hall.image).url() : '/images/no-image.jpg'} />
                        <div className="hall-card-title">{hall.title}</div>
                        <div className="hall-card-phone">Phone: {hall.phone}</div>
                        <div className="hall-card-address">Address: {hall.address}</div>
                        <div className="hall-card-price">Price: {hall.price}</div>
                        <div className="hall-card-description">{hall.description.length > 100 ? hall.description.substring(0, 100) + '...' : hall.description}</div>
                        {(() => {
                            if (hall.booked && hall.booker == Meteor.userId()) {
                                return (
                                    <div id={hall._id} className="hall-card-actions">
                                        <button className="action-button mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect" onClick={this.unbook.bind(this)}>Unbook</button>
                                    </div>
                                );
                            }
                            else if (!hall.booked && hall.creator != Meteor.userId()) {
                                return (
                                    <div id={hall._id} className="hall-card-actions">
                                        <button className="action-button mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect" onClick={this.book.bind(this)}>Book</button>
                                    </div>
                                );
                            }
                            else if (hall.booked && hall.creator == Meteor.userId()) {
                                return (
                                    <div id={hall._id} className="hall-card-actions">
                                        <dialog id={hall._id + '_dialog'} className="mdl-dialog">
                                            <h4 className="mdl-dialog__title">Contact</h4>
                                            <div className="mdl-dialog__content">
                                                <p>Email: {hall.booker_email}</p>
                                            </div>
                                            <div className="mdl-dialog__actions">
                                                <button type="button" className="mdl-button close" onClick={this.closeDialog}>Ok</button>
                                            </div>
                                        </dialog>
                                        <button className="action-button mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect" onClick={this.contact.bind(this)}>Contact Client</button>
                                    </div>
                                );
                            }
                        })()}
                    </div>
                );
            }
        });
        return (
            <div className="home">
                {halls}
                <button className="floating-button mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored" onClick={this.addHall.bind(this)}>
                    <i className="material-icons">add</i>
                </button>
            </div>
        )
    }
};