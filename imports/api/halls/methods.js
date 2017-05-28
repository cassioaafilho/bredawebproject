// Methods related to halls
import { Meteor } from 'meteor/meteor';
import { Halls } from './halls.js';

Meteor.methods({
    'halls.insert'(name, address, price, image) {
        return Halls.insert({
            name,
            address,
            price,
            image,
            createdAt: new Date()
        });
    }
});