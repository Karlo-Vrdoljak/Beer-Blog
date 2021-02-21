// @ts-nocheck
import { Box, Button, Flex, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, NumberInput, Select, SimpleGrid, Spinner, Textarea, useToast } from "@chakra-ui/react";
import AuthContext from "context/AuthProvider";
import ServiceContext from "context/ServiceProvider";
import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { ErrorMessage } from "../beersCrud/ErrorMessage";


function RegisterUser(props) {
	const initialRef = React.useRef();
	const toast = useToast();
	const appService = React.useContext(ServiceContext);
	const auth = React.useContext(AuthContext);
    const [manufs, setmanufs] = useState([]);
    let initialValues = {
        email: "",
        username: "",
        passOne: "",
        passTwo: ""
    };
    React.useEffect(() => {
        appService.manufService.getBeerManufacturers().then(manufs => {
            setmanufs(manufs);
        });
    }, []);
    const userSchema = Yup.object().shape({
        email: Yup.string().email("This is not how an email should look like!").required(),
        username: Yup.string().min("4", "Username must have at least 4 characters!").test("test-username", "Username already taken!", function (value) {
            return new Promise((resolve) => {
                appService.getUserByUsername(value).then(user => {
                    if (user && user.pkUser) {
                        return resolve(false);
                    }
                    return resolve(true);
                })
            })
        }).required(),
        passOne: Yup.string().min(7).required(),
        passTwo: Yup.string().min(7).required().test("test-pass", "Passwords don't match", function(value) {
            let passOne = document.getElementById('formPassOne').value;
            if (passOne === value) {
                return true;
            }
            return false;
        }),
    });
    return (
        <Modal size="3xl" blockScrollOnMount={true} initialFocusRef={initialRef} isOpen={props.isOpen} onClose={props.onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Register account</ModalHeader>
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
                                    .registerUser(
                                        {
                                            email: result.email,
                                            username: result.username,
                                            password: result.passOne, 
                                            isAdmin: 0, 
                                            isActive: 1,
                                            pkManufacturer: result.pkManufacturer
                                        }
                                    )
                                    .then(() => {
                                        props.onClose();
                                        toast({
                                            title: "Success!",
                                            description: "You have created your account successfully!",
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
                                        <FormLabel>Username</FormLabel>
                                        <Field name="username" as={Input}></Field>
                                        <ErrorMessage errors={formProps.errors["username"]} touched={formProps.touched["username"]}></ErrorMessage>
                                    </Box>
                                    <Box my="2">
										<FormLabel>Brewer</FormLabel>
										<Field name="pkManufacturer" as={Select} placeholder="Select your brewery">
											{manufs.map(c => (
												<option key={c.pkManufacturer} value={c.pkManufacturer} name={c.name}>
													{c.name}
												</option>
											))}
										</Field>
										<ErrorMessage errors={formProps.errors["pkManufacturer"]} touched={formProps.touched["pkManufacturer"]}></ErrorMessage>
									</Box>
                                    <Box my="2">
                                        <FormLabel>Password</FormLabel>
                                        <Field id="formPassOne" name="passOne" type="password" as={Input}></Field>
                                        <ErrorMessage errors={formProps.errors["passOne"]} touched={formProps.touched["passOne"]}></ErrorMessage>
                                    </Box>
                                    <Box my="2">
                                        <FormLabel>Confirm password</FormLabel>
                                        <Field name="passTwo" type="password" as={Input}></Field>
                                        <ErrorMessage errors={formProps.errors["passTwo"]} touched={formProps.touched["passTwo"]}></ErrorMessage>
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
}

export default RegisterUser;
