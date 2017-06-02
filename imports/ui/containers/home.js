import { Meteor } from 'meteor/meteor';
import React from 'react';
import { compose } from 'react-komposer';
import tracker from '/imports/helpers/meteor-data-tracker';
import Home from '/imports/ui/components/home';

import { HallsCollection } from '/imports/api/halls/halls';
import { ImagesCollection } from '/imports/api/images/images';

const getReactiveData = (props, onData) => {
    const HallsSub = Meteor.subscribe('halls.all');
    const ImagesSub = Meteor.subscribe('images.all');
    if (HallsSub.ready() && ImagesSub.ready()) {
        const halls = HallsCollection.find().fetch();
        onData(null, { halls });
    }
};

export default compose(tracker(getReactiveData))(Home);