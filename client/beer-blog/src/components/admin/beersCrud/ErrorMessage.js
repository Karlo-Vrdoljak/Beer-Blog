import { Box } from "@chakra-ui/react";
import React from "react";

export function ErrorMessage(props) {
	return <Box color="red.400">{props.errors && props.touched ? <div>{props.errors}</div> : null}</Box>;
}
