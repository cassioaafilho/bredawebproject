import { Meteor } from 'meteor/meteor';
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

import BaseLayout from '/imports/ui/containers/base-layout';
import Home from '/imports/ui/containers/home';
import Login from '/imports/ui/containers/login';
import Join from '/imports/ui/containers/join';
import NotFound from '/imports/ui/containers/not-found';

const renderRoutes = () => (
	<Router history={browserHistory}>
		<Route path="/" component={BaseLayout}>
			<IndexRoute component={Home}/>
			<Route path="login" component={Login}/>
			<Route path="join" component={Join}/>
			<Route path="*" component={NotFound}/>
		</Route>
	</Router>
);

Meteor.startup(() => {
	render(renderRoutes(), document.getElementById('page-container'));
});