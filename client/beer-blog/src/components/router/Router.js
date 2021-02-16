import { ChevronDownIcon } from "@chakra-ui/icons";
import { Box, Button, Icon, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import AuthContext from "context/AuthProvider";
import React, { useContext } from "react";
import { FaBeer, FaUsers } from "react-icons/fa";
import { Link } from "react-router-dom";

function AppRouter() {
	return (
		<>
			<Box pr="2">
				<Link to="/">
					<Button rightIcon={<Icon as={FaBeer} />} colorScheme="yellow" variant="outline">
						Home
					</Button>
				</Link>
			</Box>
			<Box pr="2">
				<Link to="/manufacturer/all">
					<Button rightIcon={<Icon as={FaUsers} />} colorScheme="yellow" variant="outline">
						Breweries
					</Button>
				</Link>
			</Box>
			<AdminMenu></AdminMenu>
		</>
	);
}

function AdminMenu(props) {
	const auth = useContext(AuthContext);

	const menuItems = [
		{ label: "Breweries", path: "/admin/breweries" },
		{ label: "Beers", path: "/admin/beers" },
		{ label: "Users", path: "/admin/users" },
	];
	if (auth.isAuthenticated() && auth.isAdmin()) {
		return (
			<Box pr="2">
				<Menu>
					{({ isOpen }) => (
						<>
							<MenuButton isActive={isOpen} colorScheme="yellow" as={Button} rightIcon={<ChevronDownIcon />}>
								Administration
							</MenuButton>
							<MenuList>
								{menuItems.map(item => (
									<Link key={item.path} to={item.path}>
										<MenuItem>{item.label}</MenuItem>
									</Link>
								))}
							</MenuList>
						</>
					)}
				</Menu>
			</Box>
		);
	}
	return <></>;
}
export default AppRouter;
