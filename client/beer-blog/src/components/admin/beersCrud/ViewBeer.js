// @ts-nocheck
import { Box, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import Beer from "components/beer/Beer";
import React from "react";


function ViewBeer(props) {
	const initialRef = React.useRef();

	if (props.beer) {
		return (
			<Modal size="md" blockScrollOnMount={true} initialFocusRef={initialRef} isOpen={props.isOpen} onClose={props.onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>{props.beer.name}</ModalHeader>
					<ModalCloseButton />
					<ModalBody pb={6}>
						<Box d="flex" justifyContent="center"><Beer beer={props.beer}></Beer></Box>
					</ModalBody>
				</ModalContent>
			</Modal>
		);
	} else {
		return <></>;
	}
}
export default ViewBeer;
