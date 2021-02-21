// @ts-nocheck
import { Avatar, Box, Button, Flex, Icon, Table, TableCaption, Tbody, Td, Tfoot, Th, Thead, Tr, useDisclosure } from "@chakra-ui/react";
import Loader from "components/loader/Loader";
import ServiceContext from "context/ServiceProvider";
import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import { FaCheck, FaEye, FaSyncAlt,FaTimes,Switch } from "react-icons/fa";
import { CrudMenu } from "./CrudMenu";
import DeleteUser from "./userCrud/DeleteUser";
import EditUser from "./userCrud/EditUser";

function TableHeader() {
	return (
		<Tr>
			<Th>Username</Th>
			<Th>Email</Th>
			<Th isNumeric>Active</Th>
			<Th isNumeric>Administrator</Th>
		</Tr>
	);
}
function TrueOrFalse(props) {
    return props.item? <Icon color="cyan" as={FaCheck} />: <Icon color="red" as={FaTimes} />;
}

function TableBody(props) {
	const rowSelect = index => {
		return props.onRowSelect(props.users[index], index);
	};
	return (
		<>
			{props.users.map((u, i) => {
				return (
					<Tr bgColor={props.selected == i ? "blue.900" : null} key={i} onClick={() => rowSelect(i)}>
						<Td>{u.username}</Td>
						<Td>{u.email}</Td>
						<Td isNumeric><TrueOrFalse  item={u.isActive}/></Td>
						<Td isNumeric><TrueOrFalse  item={u.isAdmin}/></Td>
					</Tr>
				);
			})}
		</>
	);
}

const AdminUsers = observer(() => {
	const [selectedRowIndex, setselectedRowIndex] = useState(-1);
	const [selectedRow, setselectedRow] = useState(null);
    const [users, setusers] = useState(null);
    const [editmode, seteditmode] = useState(false);
    const deleteUser = useDisclosure();
	const editUser = useDisclosure();
	const onRowSelect = (row, i) => {
		setselectedRowIndex(i);
		setselectedRow(row);
		console.log(selectedRowIndex, selectedRow);
	};


	const appService = React.useContext(ServiceContext);

	const loadData = () => {
		return new Promise((resolve, reject) => {
			appService.getUsers().then(data => {
				setusers(data);
				if(selectedRowIndex != -1) setselectedRow(data[selectedRowIndex]);
				resolve();
			});
		});
    };
    const switchMode = (edit = false) => {
		if(edit) {
			seteditmode(true);
		} else {
			seteditmode(false);
		}
	}
	useEffect(() => {
		loadData();
	}, []);
	console.log(users);
	if (users) {
		return (
			<>
				<Table colorScheme="gray">
					<TableCaption placement="top">
						<Flex>
							<Box pr="2" fontSize="2xl">
								Users
							</Box>
							<Box>
								<CrudMenu text="user" switchMode={switchMode} onlyEdit add={editUser} delete={deleteUser}></CrudMenu>
								<Button onClick={loadData} ml={3} rightIcon={<Icon as={FaSyncAlt} />} colorScheme="blue" mr={3}>
									Refresh
								</Button>
							</Box>
						</Flex>
					</TableCaption>
					<Thead>
						<TableHeader></TableHeader>
					</Thead>
					<Tbody>
						<TableBody selected={selectedRowIndex} users={users} onRowSelect={onRowSelect}></TableBody>
					</Tbody>
					<Tfoot>
						<TableHeader></TableHeader>
					</Tfoot>
				</Table>
				<EditUser refresh={loadData} user={editmode? selectedRow: null} isOpen={editUser.isOpen} onClose={editUser.onClose}></EditUser>
				<DeleteUser refresh={loadData} isOpen={deleteUser.isOpen} onClose={deleteUser.onClose} user={selectedRow}></DeleteUser>
				
			</>
		);
	} else {
		return <Loader></Loader>;
	}
});
export default AdminUsers;
