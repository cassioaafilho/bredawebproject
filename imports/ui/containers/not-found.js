import { Meteor } from 'meteor/meteor';
import React from 'react';
import { compose } from 'react-komposer';
import tracker from '/imports/helpers/meteor-data-tracker';
import NotFound from '/imports/ui/components/not-found';
import Loading from '/imports/ui/components/loading';

const getReactiveData = (props, onData) => {
    onData(null, {});
};

const options = {
    loadingHandler: () => (<Loading />)
};

export default compose(tracker(getReactiveData), options)(NotFound);