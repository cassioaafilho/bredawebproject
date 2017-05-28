// All halls-related publications
import { Meteor } from 'meteor/meteor';
import { Halls } from '../halls.js';

Meteor.publish('halls.all', function () {
  return Halls.find();
});