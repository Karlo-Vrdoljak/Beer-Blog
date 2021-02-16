import { Box, Flex, Heading, SimpleGrid } from "@chakra-ui/react";
import Beer from "components/beer/Beer";
import Loader from "components/loader/Loader";
import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ServiceContext from "context/ServiceProvider";



const ManufBeers = observer(() => {
	const appService = React.useContext(ServiceContext);
	// @ts-ignore
	let { id } = useParams();

	const [beers, setBeers] = useState(() => {
		return null;
	});

	useEffect(() => {
		appService.manufService.getBeerManufacturerBeersDetailed(id).then(data => setBeers(data));
	}, [id]);
	console.log(beers);
	if (beers) {
        if (beers.length > 0) {
            return (
                <Box m="4" h="90vh" overflow="auto">
                    <SimpleGrid m="4" justifyItems="center" columns={[1, 2, 3]} spacing="6">
                        {beers.map(beer => (
                            <Beer key={beer.pkBeer} beer={{...beer, hideManufLink: true}} />
                        ))}
                    </SimpleGrid>
                </Box>
            );
        } else {
            return (
				<Flex alignItems="center" w="100%" h="90vh" justifyContent="center">
					<Box>
						<Heading>No Beers found!</Heading>
					</Box>
				</Flex>
			);
        }
	} else {
		return <Loader></Loader>;
	}
});
export default ManufBeers;
