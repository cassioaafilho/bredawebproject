import { Meteor } from 'meteor/meteor';
import React from 'react';
import { render } from 'react-dom';
import { browserHistory } from 'react-router';
import { Component } from 'react';
import styles from '/imports/ui/stylesheets/add-hall'

export default class AddHall extends Component {

    // Lifecyle handlers
    componentWillMount() {
        this.setState({
            title: '',
            phone: '',
            price: '',
            image: '',
            address: '',
            description: ''
        });
    }
    componentDidMount() {
        componentHandler.upgradeDom();
        document.getElementById('title').parentElement.classList.remove('is-invalid');
        document.getElementById('phone').parentElement.classList.remove('is-invalid');
        document.getElementById('price').parentElement.classList.remove('is-invalid');
        document.getElementById('address').parentElement.classList.remove('is-invalid');
        document.getElementById('description').parentElement.classList.remove('is-invalid');
        document.getElementById('image').parentElement.classList.remove('is-invalid');
    }

    // Event handlers
    onAddHallSubmit(event) {
        event.preventDefault();
        Meteor.loginWithPassword({ email: this.state.email }, this.state.password, (error) => {
            if (error) document.getElementById('snackbar').MaterialSnackbar.showSnackbar({ message: error });
            else browserHistory.push('/');
        });
    };
    onTitleChange(event) {
        this.setState({
            title: event.target.value
        });
    };
    onPhoneChange(event) {
        this.setState({
            phone: event.target.value
        });
    };
    onPriceChange(event) {
        this.setState({
            price: event.target.value
        });
    };
    onAddressChange(event) {
        this.setState({
            address: event.target.value
        });
    };
    onDescriptionChange(event) {
        this.setState({
            description: event.target.value
        });
    };

    render() {
        return (
            <div className="add-hall">
                <div className="add-hall-form-frame">
                    <div className="add-hall-form-frame-title">
                        Add Hall
                    </div>
                    <form>
                        <div className="form-input mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                            <input className="mdl-textfield__input" value={this.state.title} onChange={this.onTitleChange.bind(this)} type="text" id="title" required />
                            <label className="mdl-textfield__label" htmlFor="title">Title</label>
                        </div>
                        <div className="form-input mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                            <input className="mdl-textfield__input" value={this.state.phone} onChange={this.onPhoneChange.bind(this)} type="phone" id="phone" required />
                            <label className="mdl-textfield__label" htmlFor="phone">Phone Number</label>
                        </div>
                        <div className="form-input mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                            <input className="mdl-textfield__input" value={this.state.address} onChange={this.onAddressChange.bind(this)} type="text" id="address" required />
                            <label className="mdl-textfield__label" htmlFor="address">Address</label>
                        </div>
                        <div className="form-input mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                            <input className="mdl-textfield__input" value={this.state.price} onChange={this.onPriceChange.bind(this)} type="numeric" id="price" required />
                            <label className="mdl-textfield__label" htmlFor="price">Price</label>
                        </div>
                        <div className="form-input mdl-textfield mdl-js-textfield">
                            <textarea className="mdl-textfield__input" type="text" rows="3" id="description" onChange={this.onDescriptionChange.bind(this)} defaultValue={this.state.description} required></textarea>
                            <label className="mdl-textfield__label" htmlFor="description">Description</label>
                        </div>
                    </form>
                </div>
                <div className="add-hall-image-frame">
                    <input type="file" id="image" className="form-input-image" accept="image/*" required/>
                    <img id="cropper" className="add-hall-image" src="/images/no-image.jpg" />
                </div>
            </div>
        );
    };
};