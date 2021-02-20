// @ts-nocheck
import { Box, Button, Flex, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, NumberInput, Select, SimpleGrid, Spinner, Textarea, useToast } from "@chakra-ui/react";
import AuthContext from "context/AuthProvider";
import ServiceContext from "context/ServiceProvider";
import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { linkTest } from "./linkTest";

function CountryOptions() {
	const appService = React.useContext(ServiceContext);
	const [country, setcountry] = useState([]);
	useEffect(() => {
		appService.manufService.getCountries().then(data => {
			setcountry(data);
		});
	}, []);
	if (country) {
		return (
			<>
				{country.map(c => (
					<option key={c.code} value={c.name}>
						{c.name}
					</option>
				))}
			</>
		);
	} else {
		return <Spinner />;
	}
}

// function YearOfEstablishmentInput() {
// 	return (
// 		<>
// 			<NumberInputField />
// 			<NumberInputStepper>
// 				<NumberIncrementStepper />
// 				<NumberDecrementStepper />
// 			</NumberInputStepper>
// 		</>
// 	);
// }

function switchFormType(type, key, value) {
	switch (type) {
		case Select: {
			return <CountryOptions></CountryOptions>;
		}
		// case NumberInput: {
		// 	return <YearOfEstablishmentInput></YearOfEstablishmentInput>;
		// }
	}
	return null;
}

function switchFormTypeProps(type, key) {
	switch (type) {
		case Select: {
			return {
				placeholder: "Select your country",
			};
		}
		case NumberInput: {
			return {
				defaultValue: new Date().getFullYear(),
				min: 499,
				max: new Date().getFullYear(),
			};
		}
		default: {
			return {};
		}
	}
}

function AddEditBrewery(props) {
	const appService = React.useContext(ServiceContext);
	const auth = React.useContext(AuthContext);
	const toast = useToast();
	const [countries, setcountries] = useState([]);

	const initialRef = React.useRef();
	const breweySchema = Yup.object().shape({
		name: Yup.string().min(2, "Too Short!").max(50, "Too Long!").label("Name").meta({ formType: Input }).required(),
		description: Yup.string().min(2, "Too Short!").max(2048, "Too Long!").label("Description").meta({ formType: Textarea }).required(),
		fbUrl: Yup.string().test("test-fb-url", "This is not a link!", linkTest).label("Facebook URL").meta({ formType: Input }),
		instagramUrl: Yup.string().test("test-insta-url", "This is not a link!", linkTest).label("Instagram URL").meta({ formType: Input }),
		logoUrl: Yup.string().test("test-logo-url", "This is not a link!", linkTest).label("Logo URL").meta({ formType: Input }),
		pageUrl: Yup.string().test("test-page-url", "This is not a link!", linkTest).label("Website URL").meta({ formType: Input }),
		country: Yup.string().label("Country").meta({ formType: Select }),
		yearOfEstablishment: Yup.number()
			.integer()
			.moreThan(499, "That's too ancient!")
			.lessThan(new Date().getFullYear() + 1, "In the future? Really?")
			.label("Year of establishment")
			.meta({ formType: Input })
			.required(),
	});
	let initialValues = {
		name: "",
		description: "",
		fbUrl: "",
		instagramUrl: "",
		logoUrl: "",
		pageUrl: "",
		country: "",
		yearOfEstablishment: new Date().getFullYear(),
	};
	if (props.editMode) {
		if (props.brewery) {
			initialValues = {
				name: props.brewery.name,
				description: props.brewery.description,
				fbUrl: props.brewery.fbUrl,
				instagramUrl: props.brewery.instagramUrl,
				logoUrl: props.brewery.logoUrl,
				pageUrl: props.brewery.pageUrl,
				country: props.brewery.countryName,
				yearOfEstablishment: props.brewery.yearOfEstablishment,
			};
		} else {
			toast.closeAll();
			console.log(props.isOpen);
			toast({
				title: "Hold up!",
				description: "You have to pick a brewery first!",
				status: "warning",
				duration: 5000,
				isClosable: true,
			});
			props.onClose();
		}
	}

	useEffect(() => {
		appService.manufService.getCountries().then(data => {
			setcountries(data);
		});
	}, []);
	console.log(initialValues);
	return (
		<>
			<Modal size="3xl" blockScrollOnMount={true} initialFocusRef={initialRef} isOpen={props.isOpen} onClose={props.onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>{props.editMode ? ('Edit ' + initialValues.name ): 'New Brewery'}</ModalHeader>
					<ModalCloseButton />
					<ModalBody pb={6}>
						<Formik
							enableReinitialize={true}
							initialValues={initialValues}
							validationSchema={breweySchema}
							onSubmit={values => {
								// same shape as initial values

								let result = JSON.parse(JSON.stringify(values));
								result.country = countries.find(c => c.name === result.country);
								console.log(result);

								if (props.editMode) {
									appService.manufService
										.updateManufacters(
											{
												yearOfEstablishment: result.yearOfEstablishment,
												pkCountry: (result.country && result.country.pkCountry) || null,
												description: result.description,
												logoUrl: result.logoUrl,
												fbUrl: result.fbUrl,
												instagramUrl: result.instagramUrl,
												pageUrl: result.pageUrl,
												name: result.name,
												pkManufacturer: props.brewery.pkManufacturer,
											},
											auth.getBearerToken()
										)
										.then(inserted => {
											props.refresh();
											toast({
												title: "Brewery updated!",
												description: "You have successfully updated your brewery's details!",
												status: "success",
												duration: 5000,
												isClosable: true,
											});
											props.onClose();
										});
								} else {
									appService.manufService
										.insertManufacturer(
											{
												yearOfEstablishment: result.yearOfEstablishment,
												pkCountry: (result.country && result.country.pkCountry) || null,
												description: result.description,
												logoUrl: result.logoUrl,
												fbUrl: result.fbUrl,
												instagramUrl: result.instagramUrl,
												pageUrl: result.pageUrl,
												name: result.name,
											},
											auth.getBearerToken()
										)
										.then(inserted => {
											props.completeFirstFormStep(inserted);
											props.refresh();
											toast({
												title: "Almost done!",
												description: "Now just register your new brewery to a user!",
												status: "success",
												duration: 5000,
												isClosable: true,
											});
										});
								}
							}}
						>
							{({ errors, touched }) => (
								<Form>
									<SimpleGrid columns={2} spacing={10}>
										{Object.keys(breweySchema.fields).map((key, i) => (
											<Box key={i} my="2">
												<FormLabel>{breweySchema.fields[key].spec.label}</FormLabel>
												<Field name={key} as={breweySchema.fields[key].spec.meta.formType} {...switchFormTypeProps(breweySchema.fields[key].spec.meta.formType, key)}>
													{switchFormType(breweySchema.fields[key].spec.meta.formType, key)}
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

export default AddEditBrewery;
