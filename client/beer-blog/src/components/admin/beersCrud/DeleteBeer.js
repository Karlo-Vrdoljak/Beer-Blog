// @ts-nocheck
import { useToast } from "@chakra-ui/react";
import AuthContext from "context/AuthProvider";
import ServiceContext from "context/ServiceProvider";
import React from "react";
import { GenericDelete } from "../GenericDelete";

function DeleteBeer(props) {
	const beer = props.beer;
	const appService = React.useContext(ServiceContext);
	const toast = useToast();
	const auth = React.useContext(AuthContext);
	console.log(beer);
	if (!beer) {
		if (props.isOpen) {
			toast.closeAll();
			toast({
				title: "Hold up!",
				description: "You have to pick a beer first!",
				status: "warning",
				duration: 5000,
				isClosable: true,
			});
		}
		props.onClose();
	}
	const deleteBeer = () => {
		return new Promise(resolve => {

            return;
			appService.beerService.deleteBeer(beer.pkBeer, auth.getBearerToken()).then(() => {
				props.refresh();
				toast({
					title: "If you say so!",
					description: "Beer successfully deleted!",
					status: "success",
					duration: 5000,
					isClosable: true,
				});
				resolve();
			});
		});
	};
	return <GenericDelete text={beer && beer.beerName || ''} deleteFunction={deleteBeer} {...props}></GenericDelete>;
}

export default DeleteBeer;
