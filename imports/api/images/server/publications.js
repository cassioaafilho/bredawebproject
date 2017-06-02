// All images-related publications
import { Meteor } from 'meteor/meteor';
import { ImagesCollection } from '../images.js';

Meteor.publish('images.all', function () {
	return ImagesCollection.find();
});