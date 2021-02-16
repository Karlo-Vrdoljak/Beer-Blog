// @ts-nocheck
import { Box, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, FormLabel, Input, Stack, useDisclosure, useToast } from "@chakra-ui/react";
import AuthContext from "context/AuthProvider";
import { observer } from "mobx-react";
import React, { useContext, useEffect, useState } from "react";
import AppService from "service/app.service";
import ServiceContext from "context/ServiceProvider";
import {useLocation, useHistory} from "react-router-dom";


const LoginDrawer = observer(() => {
	const appService = React.useContext(ServiceContext);
	const authUser = useContext(AuthContext);
	const toast = useToast();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const firstField = React.useRef();
	let location = useLocation();
	const history = useHistory();
	let { from } = location.state || { from: { pathname: "/" } };

	const [user, setuser] = useState(() => {
		return { username: "", password: "", auth: null };
	});
	const login = () => {
		if(user.username.length > 0) {
			appService.login(user).then(auth => {
				console.log(auth);
				if (!auth.err) {
					authUser.setUser({ ...user, auth: auth });
					setuser({ username: "", password: "", auth: null });
					if (from.pathname.includes('/admin/')) {
						history.push(from.pathname);
					}
					setTimeout(() => {
						onClose();
					}, 200);
				} else {
					toast({
						title: "Sign in failed!",
						description: auth.err,
						status: "error",
						duration: 5000,
						isClosable: true,
					});
				}
			});
		}
	};

	const handleChange = event => {
		let u = JSON.parse(JSON.stringify(user));
		u[event.target.id] = event.target.value;
		setuser(u);
	};

	return (
		<>
			<Button id="sign-in-btn" colorScheme="yellow" onClick={onOpen}>
				Sign in
			</Button>
			<Drawer isOpen={isOpen} placement="right" initialFocusRef={firstField} onClose={onClose}>
				<DrawerOverlay>
					<DrawerContent>
						<DrawerCloseButton />
						<DrawerHeader borderBottomWidth="1px">Sign in</DrawerHeader>

						<DrawerBody>
							<Stack spacing="24px">
								<Box>
									<FormLabel htmlFor="username">Username</FormLabel>
									<Input ref={firstField} id="username" value={user.username} onChange={handleChange} placeholder="Please enter your user name" />
								</Box>

								<Box>
									<FormLabel htmlFor="password">Username</FormLabel>
									<Input type="password" id="password" value={user.password} onChange={handleChange} placeholder="Please enter your password" />
								</Box>
							</Stack>
						</DrawerBody>

						<DrawerFooter borderTopWidth="1px">
							<Button variant="outline" mr={3} onClick={onClose}>
								Cancel
							</Button>
							<Button colorScheme="blue" onClick={login}>
								Submit
							</Button>
						</DrawerFooter>
					</DrawerContent>
				</DrawerOverlay>
			</Drawer>
		</>
	);
});
export default LoginDrawer;
