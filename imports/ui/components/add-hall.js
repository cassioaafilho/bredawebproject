import { Meteor } from 'meteor/meteor';
import React from 'react';
import { render } from 'react-dom';
import { browserHistory } from 'react-router';
import { Component } from 'react';
import Cropper from 'cropperjs';
import styles from '/imports/ui/stylesheets/add-hall';
import cropperstyles from '/node_modules/cropperjs/dist/cropper.min.css';

export default class AddHall extends Component {

    // Lifecyle handlers
    componentWillMount() {
        console.log('here')
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
    }

    // Links
    goHome(event) {
        event.preventDefault();
        browserHistory.push('/');
    };

    // Event handlers
    changeImage(event) {
        if (event.currentTarget.files && event.currentTarget.files[0]) {
            const reader = new FileReader();
            reader.onload = (e => {
                const image = document.getElementById('cropper');
                image.src = e.target.result;
                cropper = new Cropper(image, {
                    aspectRatio: 795/803,
                    viewMode: 2,
                    dragMode: 'none',
                    zoomOnWheel: 'false',
                    zoomable: 'false',
                    ready: ((e) => {
                        this.setState({ image: cropper.getCroppedCanvas().toDataURL('image/jpeg', 0.8) })
                    }).bind(this),
                    crop: ((e) => {
                        this.setState({ image: cropper.getCroppedCanvas().toDataURL('image/jpeg', 0.8) })
                    }).bind(this)
                });
            }).bind(this);
            reader.readAsDataURL(event.currentTarget.files[0]);
        }
    };
    onAddHallSubmit(event) {
        event.preventDefault();
        Meteor.call('halls.insert', this.state.title, this.state.image, this.state.phone, this.state.address, this.state.price, this.state.description, (error) => {
            if(error) document.getElementById('snackbar').MaterialSnackbar.showSnackbar({ message: error });
            else {
                document.getElementById('snackbar').MaterialSnackbar.showSnackbar({ message: 'Hall added successfully!' });
                browserHistory.push('/');
            }
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
                    <form id="add-hall-form" onSubmit={this.onAddHallSubmit.bind(this)}>
                        <div className="add-hall-form-frame-title">
                            Add Hall
                        </div>
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
                    <div className="add-hall-card-actions">
                        <button className="action-button mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect" type="submit" form="add-hall-form">Add</button>
                        <button className="action-button mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect" onClick={this.goHome}>Go Back</button>
                    </div>
                </div>
                <div className="add-hall-image-frame">
                    <div>
                        <input type="file" id="image" className="form-input-image" accept="image/*" onChange={this.changeImage.bind(this)} required />
                        <img id="cropper" className="add-hall-image" src="/images/no-image.jpg" />
                    </div>
                </div>
            </div>
        );
    };
};