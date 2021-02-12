// @ts-nocheck
import { Button, Link as ChakraLink } from "@chakra-ui/react";
import React from "react";

function SocialIcons(props) {
	return (
		<ChakraLink d="flex" flexWrap="wrap" href={props.link} isExternal>
			<Button p={2} colorScheme={props.color} leftIcon={props.icon}>
				{props.label}
			</Button>
		</ChakraLink>
	);
}

export default SocialIcons;
