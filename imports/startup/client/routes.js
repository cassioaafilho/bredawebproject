import { Meteor } from 'meteor/meteor';
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

import BaseLayout from '/imports/ui/containers/base-layout';
import Home from '/imports/ui/containers/home';
import AddHall from '/imports/ui/containers/add-hall';
import Login from '/imports/ui/containers/login';
import Join from '/imports/ui/containers/join';
import NotFound from '/imports/ui/containers/not-found';

const requireAuth = (nextState, replace) => {
	if (!Meteor.userId()) {
		replace({ pathname: '/login' });
	}
};

const requireUnAuth = (nextState, replace) => {
	if (Meteor.userId()) {
		replace({ pathname: '/' });
	}
};

const renderRoutes = () => (
	<Router history={browserHistory}>
		<Route path="/" component={BaseLayout}>
			<IndexRoute component={Home} />
			<Route path="add-hall" component={AddHall} onEnter={requireAuth} />
		</Route>
		<Route path="login" component={Login} onEnter={requireUnAuth} />
		<Route path="join" component={Join} onEnter={requireUnAuth} />
		<Route path="*" component={NotFound} />
	</Router>
);

Meteor.startup(() => {
	render(renderRoutes(), document.getElementById('page-container'));
});