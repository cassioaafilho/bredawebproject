// Methods related to halls
import { Meteor } from 'meteor/meteor';
import { HallsCollection } from './halls';
import { ImagesCollection } from '/imports/api/images/images';

Meteor.methods({
    'halls.insert'(title, image, phone, address, price, description) {
        if (this.userId) {
            ImagesCollection.insert(image, (err, fileObj) => {
                if (err) return err;
                HallsCollection.insert({
                    title,
                    image: fileObj._id,
                    phone,
                    address,
                    price,
                    description,
                    questions: [],
                    createdAt: new Date(),
                    creator: this.userId,
                    booked: false,
                    booker: '',
                    booker_email: ''
                }, (error) => {
                    if (error) return error;
                });
            });
        }
    },
    'halls.delete'(id, imageid) {
        if (this.userId) {
            if (HallsCollection.findOne(id).creator == this.userId) {
                ImagesCollection.remove(imageid, (error) => {
                    if (error) return error;
                });
                HallsCollection.remove(id, (error) => {
                    if (error) return error;
                });
            }
            else {
                return new Error('Permission Denied! You are not owner of this hall.');
            }
        }
    },
    'halls.book'(id) {
        if (this.userId) {
            if (HallsCollection.findOne(id).booked)
                return new Error('Sorry! This hall has been booked just now.');
            HallsCollection.update(id, {
                $set: {
                    booked: true,
                    booker: this.userId,
                    booker_email: Meteor.users.findOne(this.userId).emails[0].address
                }
            });
        }
    },
    'halls.unbook'(id) {
        if (this.userId) {
            HallsCollection.update(id, {
                $set: {
                    booked: false,
                    booker: '',
                    booker_email: ''
                }
            });
        }
    }
});