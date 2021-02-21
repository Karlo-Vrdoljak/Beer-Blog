// @ts-nocheck
import { Box, Button, FormControl, Flex, Switch, Image, useToast, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Select, SimpleGrid } from "@chakra-ui/react";
import AuthContext from "context/AuthProvider";
import ServiceContext from "context/ServiceProvider";
import { Field, Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";

function ErrorMessage(props) {
	return <Box color="red.400">{props.errors && props.touched ? <div>{props.errors}</div> : null}</Box>;
}

function EditUser(props) {
	const initialRef = React.useRef();
	const toast = useToast();
	const appService = React.useContext(ServiceContext);
	const auth = React.useContext(AuthContext);

	console.log(props.user);
	if (props.user && props.user.username) {
		let initialValues = {
			email: props.user.email,
			isActive: props.user.isActive,
			isAdmin: props.user.isAdmin,
		};
		const userSchema = Yup.object().shape({
			email: Yup.string().email("This is not how an email should look like!").required(),
			isActive: Yup.string().required(),
			isAdmin: Yup.string().required(),
		});

		const switchToggle = (e, props) => {
			props.setValues(prev => ({ ...prev, [e.target.name]: e.target.checked === false ? 0 : 1 }));
		};

		return (
			<Modal size="3xl" blockScrollOnMount={true} initialFocusRef={initialRef} isOpen={props.isOpen} onClose={props.onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>{(props.user && props.user.username) || "Edit user"}</ModalHeader>
					<ModalCloseButton />
					<ModalBody pb={6}>
						<Formik
							enableReinitialize={true}
							initialValues={initialValues}
							validationSchema={userSchema}
							onSubmit={values => {
								// same shape as initial values
								let result = JSON.parse(JSON.stringify(values));
								console.log(result);
								if (result) {
									appService
										.updateUser(
											{
												email: result.email,
												isActive: result.isActive,
												isAdmin: result.isAdmin,
												pkUser: props.user.pkUser,
											},
											auth.getBearerToken()
										)
										.then(() => {
											props.refresh();
											props.onClose();
											toast({
												title: "Success!",
												description: "You have updated " + result.username + " successfully!",
												status: "success",
												duration: 5000,
												isClosable: true,
											});
										});
								}
							}}
						>
							{formProps => (
								<Form>
									<SimpleGrid columns={2} spacing={10}>
										<Box my="2">
											<FormLabel>Email</FormLabel>
											<Field name="email" as={Input}></Field>
											<ErrorMessage errors={formProps.errors["email"]} touched={formProps.touched["email"]}></ErrorMessage>
										</Box>
										<Box my="2">
											<FormLabel>Is active</FormLabel>
											<FormControl display="flex" alignItems="center">
												<FormLabel htmlFor="email-alerts" mb="0">
													Switching this property to off will revoke this user's login rights.
												</FormLabel>
												<Field id="isActiveSwitch" name="isActive" colorScheme="orange" isChecked={formProps.values.isActive} value={formProps.values.isActive} as={Switch} size="lg" onChange={$event => switchToggle($event, formProps)}></Field>
											</FormControl>
											<ErrorMessage errors={formProps.errors["isActive"]} touched={formProps.touched["isActive"]}></ErrorMessage>
										</Box>
										<Box my="2">
											<FormLabel>Is admin</FormLabel>
											<FormControl display="flex" alignItems="center">
												<FormLabel htmlFor="email-alerts" mb="0">
													Switching this property to off will revoke this user's administative privileges.
												</FormLabel>
												<Field id="isAdminSwitch" name="isAdmin" colorScheme="orange" isChecked={formProps.values.isAdmin} value={formProps.values.isAdmin} as={Switch} size="lg" onChange={$event => switchToggle($event, formProps)}></Field>
											</FormControl>
											<ErrorMessage errors={formProps.errors["isAdmin"]} touched={formProps.touched["isAdmin"]}></ErrorMessage>
										</Box>
									</SimpleGrid>
									<Flex flexDir="row-reverse">
										<Button ref={initialRef} onClick={props.onClose}>
											Cancel
										</Button>
										<Button type="submit" colorScheme="blue" mr={3}>
											Save
										</Button>
									</Flex>
								</Form>
							)}
						</Formik>
					</ModalBody>
				</ModalContent>
			</Modal>
		);
	} else {
        return <></>;
    }
}
export default EditUser;
