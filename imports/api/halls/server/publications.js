// All halls-related publications
import { Meteor } from 'meteor/meteor';
import { HallsCollection } from '../halls.js';

Meteor.publish('halls.all', function () {
	return HallsCollection.find();
});