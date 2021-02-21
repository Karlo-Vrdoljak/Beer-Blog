// @ts-nocheck
import { useToast } from "@chakra-ui/react";
import AuthContext from "context/AuthProvider";
import ServiceContext from "context/ServiceProvider";
import React from "react";
import { GenericDelete } from "../GenericDelete";

function DeleteUser(props) {
	const user = props.user;
	const appService = React.useContext(ServiceContext);
	const toast = useToast();
	const auth = React.useContext(AuthContext);
	console.log(user);
	if (!user) {
		if (props.isOpen) {
			toast.closeAll();
			toast({
				title: "Hold up!",
				description: "You have to pick a user first!",
				status: "warning",
				duration: 5000,
				isClosable: true,
			});
		}
		props.onClose();
	}
	const deleteUser = () => {
		return new Promise(resolve => {
			console.log("deleted!");
			appService.deleteUser(user.pkUser, auth.getBearerToken()).then(() => {
				props.refresh();
				toast({
					title: "If you say so!",
					description: "User successfully deleted!",
					status: "success",
					duration: 5000,
					isClosable: true,
				});
				resolve();
			});
		});
	};
	return <GenericDelete text={user && user.username || ''} deleteFunction={deleteUser} {...props}></GenericDelete>;
}

export default DeleteUser;
