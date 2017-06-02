// Definition of the halls collection
import { Mongo } from 'meteor/mongo';
const HallsCollection = new Mongo.Collection('halls');
export { HallsCollection }