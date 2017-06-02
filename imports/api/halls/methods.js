// Methods related to halls
import { Meteor } from 'meteor/meteor';
import { HallsCollection } from './halls.js';

Meteor.methods({
    'halls.insert'(title, imageURL, phone, address, price, description) {
        return HallsCollection.insert({
            title,
            imageURL,
            phone,
            address,
            price,
            description,
            questions: [],
            createdAt: new Date()
        });
    },
    'halls.imageURL.update'(id, newimageURL) {
        return HallsCollection.update(id, {
            $set: { imageURL: newimageURL }
        });
    },
    'halls.phone.update'(id, newphone) {
        return HallsCollection.update(id, {
            $set: { phone: newphone }
        });
    },
    'halls.address.update'(id, newaddress) {
        return HallsCollection.update(id, {
            $set: { address: newaddress }
        });
    },
    'halls.price.update'(id, newprice) {
        return HallsCollection.update(id, {
            $set: { price: newprice }
        });
    },
    'halls.description.update'(id, newdescription) {
        return HallsCollection.update(id, {
            $set: { description: newdescription }
        });
    },
    'halls.questions.insert'(id, question) {
        return HallsCollection.update(id, {
            $push: { questions: { _id: new Date(), question, answers: [] } }
        });
    },
    'halls.questions.answer'(id, question, answer) {
        return HallsCollection.update({ "_id": id, "questions._id": question}, {
            $push: { "questions.$.answers": answer }
        });
    }
});