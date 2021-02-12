import { Box, Button, Icon } from "@chakra-ui/react";
import React from "react";
import { FaBeer, FaUsers } from "react-icons/fa";
import { Link } from "react-router-dom";


function AppRouter() {
	return (
		<>
			<Box pr="2">
				<Link to="/">
					<Button rightIcon={<Icon as={FaBeer} />} colorScheme="yellow" variant="outline">
						Home
					</Button>
				</Link>
			</Box>
			<Box pr="2">
				<Link to="/manufacturer/all">
					<Button rightIcon={<Icon as={FaUsers} />} colorScheme="yellow" variant="outline">
						Breweries
					</Button>
				</Link>
			</Box>
		</>
	);
}
export default AppRouter;
