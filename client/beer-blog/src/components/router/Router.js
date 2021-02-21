import { ChevronDownIcon } from "@chakra-ui/icons";
import { Box, Button, Icon, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import AuthContext from "context/AuthProvider";
import { observer } from "mobx-react";
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

const AdminMenu = observer(() => {
	const auth = useContext(AuthContext);

	const [menuItems, setmenuItems] = React.useState([]);
	React.useEffect(() => {
		setmenuItems(
			auth.isAdmin()
				? [
						{ label: "Breweries", path: "/admin/breweries" },
						{ label: "Beers", path: "/admin/beers" },
						{ label: "Users", path: "/admin/users" },
				  ]
				: [
						{ label: "Breweries", path: "/admin/breweries" },
						{ label: "Beers", path: "/admin/beers" },
				  ]
		);
	}, [auth.isAdmin()]);

	if (auth.isAuthenticated()) {
		return (
			<Box pr="2">
				<Menu>
					{({ isOpen }) => (
						<>
							<MenuButton isActive={isOpen} colorScheme="yellow" as={Button} rightIcon={<ChevronDownIcon />}>
								{auth.isAdmin() ? "Administration" : "Manage brewery"}
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
});
export default AppRouter;
