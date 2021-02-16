import { Box, Button, Flex, Heading, Spacer } from "@chakra-ui/react";
import AppRouter from "components/router/Router";
import AuthContext from "context/AuthProvider";
import { observer } from "mobx-react";
import React, { useContext } from "react";
import LoginDrawer from "../login/LoginDrawer";

function LoggedInAs(props) {
	let loginData = props.auth;
	console.log(loginData);
	if (loginData && loginData.auth) {
		return (
			<Heading pl="2" size="md">
				 &bull; <Box as="span" color="yellow.300">{loginData.username}</Box>
			</Heading>
		);
	} else {
		return <></>;
	}
}

function SignIn() {
	return (
		<>
			<Button colorScheme="yellow" mr="4">
				Sign Up
			</Button>
			<LoginDrawer></LoginDrawer>
		</>
	);
}

function Logoff() {
	const auth = useContext(AuthContext);

	const signOut = () => {
		auth.clearAuth();
	};

	return (
		<Button colorScheme="red" variant="outline" mr="4" onClick={signOut}>
			Sign out
		</Button>
	);
}

const Nav = observer(props => {
	const auth = useContext(AuthContext);
	console.log({ ...auth.user });
	return (
		<Flex p="2" h="18" bg="gray.700">
			<Box p="2">
				<Flex>
					<Heading size="md">BEER BLOG</Heading>
					<LoggedInAs auth={{ ...auth.user }}></LoggedInAs>
				</Flex>
			</Box>
			<Spacer />
			<Flex>
				<AppRouter></AppRouter>
			</Flex>
			<Spacer />
			<Box>{auth.isAuthenticated() ? <Logoff></Logoff> : <SignIn></SignIn>}</Box>
		</Flex>
	);
});
export default Nav;
