import { Meteor } from 'meteor/meteor';
import React from 'react';
import { compose } from 'react-komposer';
import tracker from '/imports/helpers/meteor-data-tracker';
import Home from '/imports/ui/components/home';

const getReactiveData = (props, onData) => {
    onData(null, {});
};

export default compose(tracker(getReactiveData))(Home);