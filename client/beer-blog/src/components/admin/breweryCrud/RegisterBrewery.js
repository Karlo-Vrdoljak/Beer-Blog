// @ts-nocheck
import { Box, Button, Flex, FormLabel, Modal, useToast, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Select, SimpleGrid, Spinner } from "@chakra-ui/react";
import AuthContext from "context/AuthProvider";
import ServiceContext from "context/ServiceProvider";
import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";

function UserOptions(props) {
	const appService = React.useContext(ServiceContext);
	const [user, setuser] = useState([]);
	useEffect(() => {
		appService.getUsers().then(data => {
			setuser(data);
		});
	}, []);
	if (user) {
		return (
			<>
				{user.map(u => (
					<option key={u.username} value={u.pkUser}>
						{u.username}
					</option>
				))}
			</>
		);
	} else {
		return <Spinner />;
	}
}

function BreweryOptions(props) {
	const appService = React.useContext(ServiceContext);

	if (props.data) {
		console.log(props.data);
		return (
			<>
				<option key={props.data.pkManufacturer} value={props.data.pkManufacturer}>
					{props.data.name}
				</option>
			</>
		);
	} else {
		return <Spinner />;
	}
}

function switchFormType(type, key, data) {
	switch (type) {
		case Select: {
			switch (key) {
				case "user": {
					return <UserOptions></UserOptions>;
				}
				case "brewery": {
					return <BreweryOptions data={data}></BreweryOptions>;
				}
			}
		}
	}
	return null;
}

function switchFormTypeProps(type) {
	switch (type) {
		case Select: {
			return {
				placeholder: "Select",
			};
		}
		default: {
			return {};
		}
	}
}

function RegisterBrewery(props) {
	const firstStep = props.data;
	console.log(firstStep);
	const initialRef = React.useRef();
	const auth = React.useContext(AuthContext);
	
    const appService = React.useContext(ServiceContext);
	const toast = useToast();
    
    
	const registerBreweySchema = Yup.object().shape({
		user: Yup.string().label("User").meta({ formType: Select }),
		brewery: Yup.string().label("Brewery").meta({ formType: Select }),
	});
	console.log(registerBreweySchema);
	return (
		<>
			<Modal size="3xl" blockScrollOnMount={true} initialFocusRef={initialRef} isOpen={props.isOpen} onClose={props.onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Register user to Brewery</ModalHeader>
					<ModalCloseButton />
					<ModalBody pb={6}>
						<Formik
							initialValues={{
								user: "",
								brewery: "",
							}}
							validationSchema={registerBreweySchema}
							onSubmit={values => {
								// same shape as initial values
                                console.log(values);
                                appService.registerBrewey({
                                    pkUser:values.user,
                                    pkManufacturer:values.brewery,
                                }, auth.getBearerToken()).then(() => {
                                    props.refresh();
                                    props.onClose();
                                    toast({
                                        title: "That's that!",
                                        description: "Brewery successfully registered!",
                                        status: "success",
                                        duration: 5000,
                                        isClosable: true,
                                    });
                                })
                                
							}}
						>
							{({ errors, touched }) => (
								<Form>
									<SimpleGrid columns={2} spacing={10}>
										{Object.keys(registerBreweySchema.fields).map((key, i) => (
											<Box key={i} my="2">
												<FormLabel>{registerBreweySchema.fields[key].spec.label}</FormLabel>
												<Field name={key} as={registerBreweySchema.fields[key].spec.meta.formType} {...switchFormTypeProps(registerBreweySchema.fields[key].spec.meta.formType)}>
													{switchFormType(registerBreweySchema.fields[key].spec.meta.formType, key, firstStep)}
												</Field>
												<Box color="red.400">{errors[key] && touched[key] ? <div>{errors[key]}</div> : null}</Box>
											</Box>
										))}
									</SimpleGrid>
									<Flex flexDir="row-reverse">
										<Button ref={initialRef} onClick={props.onClose}>
											Cancel
										</Button>
										<Button type="submit" colorScheme="blue" mr={3}>
											Next
										</Button>
									</Flex>
								</Form>
							)}
						</Formik>
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
}

export default RegisterBrewery;
