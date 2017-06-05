import { Meteor } from 'meteor/meteor';
import React from 'react';
import { compose } from 'react-komposer';
import tracker from '/imports/helpers/meteor-data-tracker';
import BaseLayout from '/imports/ui/layouts/base-layout';
import Loading from '/imports/ui/components/loading';

const getReactiveData = (props, onData) => {
    if (!Meteor.loggingIn())
        onData(null, { user: Meteor.user() ? Meteor.user() : null });
};

const options = {
    loadingHandler: () => (<Loading/>)
};

export default compose(tracker(getReactiveData), options)(BaseLayout);