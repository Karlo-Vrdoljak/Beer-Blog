import { Box, Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import React from "react";

export function GenericDelete(props) {
	const initialRef = React.useRef();

	return (
		<Modal size="3xl" blockScrollOnMount={true} initialFocusRef={initialRef} isOpen={props.isOpen} onClose={props.onClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Delete Brewery</ModalHeader>
				<ModalCloseButton />
				<ModalBody pb={6} fontSize="lg">Are you sure you want to delete <Box as="span" fontWeight="bold" color="yellow.400">{props.text}</Box>!?</ModalBody>
				<ModalFooter>
					<Button mr={3} ref={initialRef} onClick={props.onClose}>
						Cancel
					</Button>
					<Button colorScheme="red" onClick={() => props.deleteFunction().then(() => props.onClose())}>
						DELETE
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
}
