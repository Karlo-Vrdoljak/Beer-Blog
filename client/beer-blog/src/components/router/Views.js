// @ts-nocheck
import { useToast } from "@chakra-ui/react";
import SingleBeer from "components/beer/SingleBeer";
import Home from "components/home/Home";
import Manufacturers from "components/manufacturer/Manufacturers";
import AdminBreweries from "components/admin/AdminBreweries";
import ManufBeers from "components/manufacturer/ManufBeers";
import AuthContext from "context/AuthProvider";
import { observer } from "mobx-react";
import React, { Children, cloneElement, useContext, useEffect } from "react";
import { Redirect, Route, Switch, useLocation } from "react-router-dom";
import AdminBeers from "components/admin/AdminBeers";
import AdminUsers from "components/admin/AdminUsers";

const PrivateRoute = ({ children, authed, ...rest }) => {
	return <Route {...rest} render={props => (authed ? <div>{Children.map(children, child => cloneElement(child, { ...child.props }))}</div> : <Redirect to={{ pathname: "/", state: { from: props.location } }} />)} />;
};

const Views = observer(() => {
	const auth = useContext(AuthContext);
	console.log({ ...auth.user });
	const toast = useToast();

	let location = useLocation();

	let { from } = location.state || { from: { pathname: "/" } };
	console.log(from.pathname);
	useEffect(() => {
		if (auth && auth.isAuthenticated() === false && from.pathname.includes("/admin/")) {
			toast({
				title: "Login is required!",
				description: "Please sign in to continue!",
				status: "warning",
				duration: 5000,
				isClosable: true,
			});
			const signInButton = document.getElementById("sign-in-btn");
			if (signInButton) {
				signInButton.click();
			}
		}
	}, [auth, from.pathname, toast]);

	return (
		<Switch>
			<Route exact path="/">
				<Home />
			</Route>
			<Route exact path="/manufacturer/all">
				<Manufacturers />
			</Route>
			<Route path="/manufacturer/beers/:id" children={<ManufBeers />} />
			<Route path="/beer/:id" children={<SingleBeer />} />
			<PrivateRoute path="/admin/breweries" authed={auth.isAuthenticated()}>
				<Route path="/admin/breweries" component={AdminBreweries} />
			</PrivateRoute>
			<PrivateRoute path="/admin/beers" authed={auth.isAuthenticated()}>
				<Route path="/admin/beers" component={AdminBeers} />
			</PrivateRoute>
			<PrivateRoute path="/admin/users" authed={auth.isAuthenticated() && auth.isAdmin()}>
				<Route path="/admin/users" component={AdminUsers} />
			</PrivateRoute>
		</Switch>
	);
});
export default Views;

// { label: 'Breweries', path: '/admin/breweries'},
// { label: 'Beers', path: '/admin/beers'},
// { label: 'Users', path: '/admin/users'},
