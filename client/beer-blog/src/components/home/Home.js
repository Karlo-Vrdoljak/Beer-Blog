// @ts-nocheck
import { Box, SimpleGrid } from "@chakra-ui/react";
import Beer from "components/beer/Beer";
import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import ServiceContext from "context/ServiceProvider";



let interval = null;
const Home = observer(() => {
	const appService = React.useContext(ServiceContext);
    const [beers, setBeers] = useState(() => []);
    
	useEffect(() => {
		appService.beerService.getBeersDetailed().then(data => setBeers(data));
		interval = setInterval(() => {
			appService.beerService.getBeersDetailed().then(data => setBeers(data));
        }, 15000);

        return function cleanup() {
            clearInterval(interval);
        }
	}, []);
	const Beers = () => {
		return beers.map(beer => {
			return <Beer beer={beer} key={beer.pkBeer}></Beer>;
		});
	};
	console.log(beers);
	return (
		<Box m="4" h="90vh" overflow="auto">
			<SimpleGrid m="4" justifyItems="center" columns={[1, 2, 3]} spacing="6">
				<Beers></Beers>
			</SimpleGrid>
		</Box>
	);
});
export default Home;
