import { Box, Flex, Spinner } from "@chakra-ui/react";
import { observer } from "mobx-react";
import React from "react";


const Loader = observer(() => (
	<Flex alignItems="center" w="100%" h="90vh" justifyContent="center">
		<Box>
			<Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
		</Box>
	</Flex>
));
export default Loader;
