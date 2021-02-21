// @ts-nocheck
import { Box, Button, Flex, Image, useToast, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Select, SimpleGrid } from "@chakra-ui/react";
import AuthContext from "context/AuthProvider";
import ServiceContext from "context/ServiceProvider";
import { Field, Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import { linkTest } from "../breweryCrud/linkTest";
import { ErrorMessage } from "./ErrorMessage";

function ChooseBrewery(props) {
	const auth = React.useContext(AuthContext);
	if (auth.isAdmin()) {
		return (
			<Box my="2">
				<FormLabel>Brewer</FormLabel>
				<Field name="pkManufacturer" as={Select} placeholder="Select the beer's brewer">
					{props.manufacturers.map(c => (
						<option key={c.pkManufacturer} value={c.pkManufacturer} name={c.name}>
							{c.name}
						</option>
					))}
				</Field>
				<ErrorMessage errors={props.formProps.errors["pkManufacturer"]} touched={props.formProps.touched["pkManufacturer"]}></ErrorMessage>
			</Box>
		);
	} else {
		return <></>;
	}
}

function AddEditBeer(props) {
	const initialRef = React.useRef();
	const toast = useToast();
	const appService = React.useContext(ServiceContext);
	const auth = React.useContext(AuthContext);
	const [currentImage, setcurrentImage] = React.useState({
		beerType: props.beer ? props.beer.beerTypeImgUrl : "",
		beerImg: props.beer ? props.beer.beerImageUrl : "",
	});
	const [beerInfo, setbeerInfo] = React.useState({
		manufacturers: [],
		beerTypes: [],
		currencies: [],
	});

	React.useEffect(() => {
		Promise.all([appService.manufService.getBeerManufacturers(), appService.BeerTypeService.getAll(), appService.currencyService.getAll()]).then(results => {
			setbeerInfo({
				manufacturers: results[0],
				beerTypes: results[1],
				currencies: results[2],
			});
		});
		if (props.beer) {
			setcurrentImage({
				beerType: props.beer.beerTypeImgUrl,
				beerImg: props.beer.beerImageUrl,
			});
		}
	}, [props.beer]);
	console.log(beerInfo, currentImage);
	let initialValues = {};
	if (props.beer) {
		// set initial values to beer
		initialValues = {
			beerAlcoholPerc: props.beer.beerAlcoholPerc,
			beerImageUrl: props.beer.beerImageUrl,
			beerName: props.beer.beerName,
			beerPrice: props.beer.beerPrice,
			beerTypeImgUrl: props.beer.beerTypeImgUrl,
			pkBeer: props.beer.pkBeer,
			pkBeerType: props.beer.pkBeerType,
			pkCurrency: props.beer.pkCurrency,
			pkManufacturer: props.beer.pkManufacturer,
		};
	} else {
		// set initial values to defaults
		initialValues = {
			beerAlcoholPerc: 0.0,
			beerImageUrl: "",
			beerName: "",
			beerPrice: 0,
			pkBeer: "",
			pkBeerType: "",
			pkCurrency: "",
			pkManufacturer: "",
		};
	}
	console.log(props.beer);
	const beerSchema = Yup.object().shape({
		beerAlcoholPerc: Yup.number().moreThan(-1, "No way it has less than 0%").lessThan(101, "Impossible to have more than 100% of alcohol!"),
		beerImageUrl: Yup.string().test("test-img-url", "This is not a link!", linkTest),
		beerName: Yup.string().min(2, "Too Short!").max(50, "Too Long!").label("Name").required(),
		beerPrice: Yup.number().positive("The price should be a positive number"),
		pkCurrency: Yup.string().required(),
		pkManufacturer: Yup.string().required(),
		pkBeerType: Yup.string().required(),
	});
	const showImg = (e, props, key) => {
		props.setValues(prev => ({ ...prev, [key]: e.target.value }));
		console.log(e.target.value, props);
		if (key === "pkBeerType") {
			let bt = beerInfo.beerTypes.find(bt => bt[key] == e.target.value);
			console.log(bt);
			if (bt && bt.imgUrl) {
				setcurrentImage(state => ((state.beerType = bt.imgUrl), state));
			} else {
				setcurrentImage(state => ((state.beerType = ""), state));
			}
		} else {
			if (e.target.value) {
				setcurrentImage(state => ((state.beerImg = e.target.value || ""), state));
			} else {
				setcurrentImage(state => ((state.beerImg = ""), state));
			}
		}
	};
	return (
		<Modal size="3xl" blockScrollOnMount={true} initialFocusRef={initialRef} isOpen={props.isOpen} onClose={props.onClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>{(props.beer && props.beer.beerName) || "New beer"}</ModalHeader>
				<ModalCloseButton />
				<ModalBody pb={6}>
					<Formik
						enableReinitialize={true}
						initialValues={initialValues}
						validationSchema={beerSchema}
						onSubmit={values => {
							// same shape as initial values
							let result = JSON.parse(JSON.stringify(values));
							console.log(result);
							if (props.beer) {
								appService.beerService
									.update(
										{
											price: result.beerPrice,
											pkCurrency: result.pkCurrency,
											alcoholPerc: result.beerAlcoholPerc,
											pkBeerType: result.pkBeerType,
											name: result.beerName,
											imageUrl: result.beerImageUrl,
											pkBeer: props.beer.pkBeer,
											pkManufacturer: result.pkManufacturer,
										},
										auth.getBearerToken()
									)
									.then(() => {
										console.log(result);
										props.refresh();
										props.onClose();
										toast({
											title: "Success!",
											description: "You have updated " + result.beerName + " successfully!",
											status: "success",
											duration: 5000,
											isClosable: true,
										});
									});
							} else {
								appService.beerService
									.insert(
										{
											price: result.beerPrice,
											pkCurrency: result.pkCurrency,
											alcoholPerc: result.beerAlcoholPerc,
											pkBeerType: result.pkBeerType,
											name: result.beerName,
											imageUrl: result.beerImageUrl,
											pkManufacturer: result.pkManufacturer,
										},
										auth.getBearerToken()
									)
									.then(() => {
										console.log(result);
										props.refresh();
										props.onClose();
										toast({
											title: "Success!",
											description: "You have added your new beer " + result.beerName + " successfully!",
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
										<FormLabel>Name</FormLabel>
										<Field name="beerName" as={Input}></Field>
										<ErrorMessage errors={formProps.errors["beerName"]} touched={formProps.touched["beerName"]}></ErrorMessage>
									</Box>
									<Box my="2">
										<FormLabel>Alcohol percentage</FormLabel>
										<NumberInput defaultValue={formProps.values.beerAlcoholPerc} precision={1} step={1.0}>
											<Field name="beerAlcoholPerc" as={NumberInputField} />
											<NumberInputStepper>
												<NumberIncrementStepper />
												<NumberDecrementStepper />
											</NumberInputStepper>
										</NumberInput>
										<ErrorMessage errors={formProps.errors["beerAlcoholPerc"]} touched={formProps.touched["beerAlcoholPerc"]}></ErrorMessage>
									</Box>
									<Box my="2">
										<FormLabel>Price</FormLabel>
										<NumberInput defaultValue={formProps.values.beerPrice} precision={2} step={1.0}>
											<Field name="beerPrice" as={NumberInputField} />
											<NumberInputStepper>
												<NumberIncrementStepper />
												<NumberDecrementStepper />
											</NumberInputStepper>
										</NumberInput>
										<ErrorMessage errors={formProps.errors["beerPrice"]} touched={formProps.touched["beerPrice"]}></ErrorMessage>
									</Box>
									<Box my="2">
										<FormLabel>Currency</FormLabel>
										<Field name="pkCurrency" as={Select} placeholder="Select the currency for the beer">
											{beerInfo.currencies.map(c => (
												<option key={c.pkCurrency} value={c.pkCurrency} name={c.code}>
													{c.code} &bull; {c.name}
												</option>
											))}
										</Field>
										<ErrorMessage errors={formProps.errors["pkCurrency"]} touched={formProps.touched["pkCurrency"]}></ErrorMessage>
									</Box>
									<ChooseBrewery formProps={formProps} manufacturers={beerInfo.manufacturers}></ChooseBrewery>
									<Box my="2" d="flex" justifyContent="center">
										<Image borderRadius="full" fallbackSrc="https://via.placeholder.com/100" boxSize="100px" objectFit="cover" src={currentImage.beerType} alt="Beer Type" />
									</Box>
									<Box my="2">
										<FormLabel>Beer type</FormLabel>
										<Field name="pkBeerType" as={Select} onChange={$event => showImg($event, formProps, "pkBeerType")} placeholder="Select the beer type for the beer">
											{beerInfo.beerTypes.map(c => (
												<option key={c.pkBeerType} value={c.pkBeerType} name={c.style}>
													{c.style}
												</option>
											))}
										</Field>
										<ErrorMessage errors={formProps.errors["pkBeerType"]} touched={formProps.touched["pkBeerType"]}></ErrorMessage>
									</Box>
									<Box my="2" d="flex" justifyContent="center">
										<Image borderRadius="full" fallbackSrc="https://via.placeholder.com/100" boxSize="100px" objectFit="cover" src={currentImage.beerImg} alt="Beer Type" />
									</Box>
									<Box my="2">
										<FormLabel>Beer image url</FormLabel>
										<Field name="beerImageUrl" as={Input} onChange={$event => showImg($event, formProps, "beerImageUrl")}></Field>
										<ErrorMessage errors={formProps.errors["beerImageUrl"]} touched={formProps.touched["beerImageUrl"]}></ErrorMessage>
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
export default AddEditBeer;
