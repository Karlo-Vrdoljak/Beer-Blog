// @ts-nocheck
import { useToast } from "@chakra-ui/react";
import AuthContext from "context/AuthProvider";
import ServiceContext from "context/ServiceProvider";
import React from "react";
import { GenericDelete } from "../GenericDelete";

function DeleteBrewery(props) {
	const brewery = props.brewery;
	const appService = React.useContext(ServiceContext);
	const toast = useToast();
	const auth = React.useContext(AuthContext);
	console.log(brewery);
	if (!brewery) {
		if (props.isOpen) {
			toast.closeAll();
			toast({
				title: "Hold up!",
				description: "You have to pick a brewery first!",
				status: "warning",
				duration: 5000,
				isClosable: true,
			});
		}
		props.onClose();
	}
	const deleteBrewery = () => {
		return new Promise(resolve => {
			console.log("deleted!");
			appService.manufService.deleteManufacturer(brewery.pkManufacturer, auth.getBearerToken()).then(() => {
				props.refresh();
				toast({
					title: "If you say so!",
					description: "Brewery successfully deleted!",
					status: "success",
					duration: 5000,
					isClosable: true,
				});
				resolve();
			});
		});
	};
	return <GenericDelete text={brewery && brewery.name || ''} deleteFunction={deleteBrewery} {...props}></GenericDelete>;
}

export default DeleteBrewery;
