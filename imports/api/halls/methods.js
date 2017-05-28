// Methods related to halls
import { Meteor } from 'meteor/meteor';
import { Halls } from './halls.js';

Meteor.methods({
    'halls.insert'(title, image, phone, address, price, description) {
        return Halls.insert({
            title,
            image,
            phone,
            address,
            price,
            description,
            questions: [],
            createdAt: new Date()
        });
    },
    'halls.image.update'(id, newimage) {
        return Halls.update(id, {
            $set: { image: newimage }
        });
    },
    'halls.phone.update'(id, newphone) {
        return Halls.update(id, {
            $set: { phone: newphone }
        });
    },
    'halls.address.update'(id, newaddress) {
        return Halls.update(id, {
            $set: { address: newaddress }
        });
    },
    'halls.price.update'(id, newprice) {
        return Halls.update(id, {
            $set: { price: newprice }
        });
    },
    'halls.description.update'(id, newdescription) {
        return Halls.update(id, {
            $set: { description: newdescription }
        });
    },
    'halls.questions.insert'(id, question) {
        return Halls.update(id, {
            $push: { questions: { _id: new Date(), question, answers: [] } }
        });
    },
    'halls.questions.answer'(id, question, answer) {
        return Halls.update({ "_id": id, "questions._id": question}, {
            $push: { "questions.$.answers": answer }
        });
    }
});