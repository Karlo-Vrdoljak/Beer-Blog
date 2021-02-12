import SingleBeer from "components/beer/SingleBeer";
import Home from "components/home/Home";
import Manufacturers from "components/manufacturer/Manufacturers";
import ManufBeers from "components/manufacturer/ManufBeers";
import AuthContext from "context/AuthProvider";
import { observer } from "mobx-react";
import React, { useContext } from "react";
import { Route, Switch } from "react-router-dom";

const Views = observer(() => {
	const user = useContext(AuthContext);
	console.log({ ...user.user });
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
		</Switch>
	);
});
export default Views;
