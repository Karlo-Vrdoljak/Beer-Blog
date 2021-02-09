import { Flex, Box, Heading, Spacer, Button } from "@chakra-ui/react";
import LoginDrawer from "../login/LoginDrawer";

import React from "react";

function Nav() {
	return (
		<Flex p="1" h="10">
			<Box p="2">
				<Heading size="md">Chakra App</Heading>
			</Box>
			<Spacer />
			<Box>
				<Button colorScheme="yellow" mr="4">
					Sign Up
				</Button>
				<Button colorScheme="yellow">Log in</Button>
				<LoginDrawer></LoginDrawer>
			</Box>
		</Flex>
	);
}
export default Nav;
