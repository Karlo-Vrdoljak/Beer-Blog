// @ts-nocheck
import { Box, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import { Manufacturer } from "components/manufacturer/Manufacturers";
import React from "react";


function ViewBrewery(props) {
	const initialRef = React.useRef();

	if (props.manuf) {
		return (
			<Modal size="md" blockScrollOnMount={true} initialFocusRef={initialRef} isOpen={props.isOpen} onClose={props.onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>{props.manuf.name}</ModalHeader>
					<ModalCloseButton />
					<ModalBody pb={6}>
						<Box d="flex" justifyContent="center"><Manufacturer {...props.manuf}></Manufacturer></Box>
					</ModalBody>
				</ModalContent>
			</Modal>
		);
	} else {
		return <></>;
	}
}
export default ViewBrewery;
