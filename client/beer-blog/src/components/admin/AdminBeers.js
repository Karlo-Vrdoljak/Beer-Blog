// @ts-nocheck
import { AddIcon, ChevronDownIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Avatar, Box, Button, Flex, Icon, Menu, MenuButton, MenuItem, MenuList, Table, TableCaption, Tbody, Td, Tfoot, Th, Thead, Tr, useDisclosure } from "@chakra-ui/react";
import Loader from "components/loader/Loader";
import AuthContext from "context/AuthProvider";
import ServiceContext from "context/ServiceProvider";
import { observer } from "mobx-react";
import React, { useContext, useEffect, useState } from "react";
import { FaEye, FaSyncAlt } from "react-icons/fa";
import AddEditBeer from "./beersCrud/AddEditBeer";
import DeleteBeer from "./beersCrud/DeleteBeer";
import ViewBeer from "./beersCrud/ViewBeer";
import { CrudMenu } from "./CrudMenu";

function TableHeader() {
	return (
		<Tr>
			<Th>Logo</Th>
			<Th>Name</Th>
			<Th>Style</Th>
			<Th isNumeric>Alcohol Percentage</Th>
			<Th isNumeric>Price</Th>
		</Tr>
	);
}

function TableBody(props) {
	const rowSelect = index => {
		return props.onRowSelect(props.beers[index], index);
	};
	return (
		<>
			{props.beers.map((b, i) => {
				return (
					<Tr bgColor={props.selected == i ? "blue.900" : null} key={i} onClick={() => rowSelect(i)}>
						<Td>
							<Avatar name={b.beerName} src={b.beerImageUrl} />
						</Td>
						<Td>{b.beerName}</Td>
						<Td>{b.style}</Td>
						<Td isNumeric>{b.beerAlcoholPerc} %</Td>
						<Td isNumeric>
							{b.beerPrice} {b.currencyCode}
						</Td>
					</Tr>
				);
			})}
		</>
	);
}

const AdminBeers = observer(() => {
	const [selectedRowIndex, setselectedRowIndex] = useState(-1);
	const [selectedRow, setselectedRow] = useState(null);
	const [beers, setbeers] = useState(null);
	const auth = useContext(AuthContext);
    const [editmode, seteditmode] = useState(false);
	const viewBeer = useDisclosure();
	const addBeer = useDisclosure();
    const deleteBeer = useDisclosure();
	const onRowSelect = (row, i) => {
		setselectedRowIndex(i);
		setselectedRow(row);
		console.log(selectedRowIndex, selectedRow);
	};

	const appService = React.useContext(ServiceContext);

	const loadData = () => {
		return new Promise((resolve, reject) => {
			appService.beerService.getBeersDetailed(auth.isAdmin()? null: auth.user.auth.data.pkUser || null).then(data => {
				setbeers(data);
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
	console.log(beers);
	if (beers) {
		return (
			<>
				<Table colorScheme="gray">
					<TableCaption placement="top">
						<Flex>
							<Box pr="2" fontSize="2xl">
								Beers
							</Box>
							<Box>
								<CrudMenu text="beer" add={addBeer} delete={deleteBeer} switchMode={switchMode}></CrudMenu>
								<Button onClick={() => viewBeer.onOpen()} ml={3} rightIcon={<Icon as={FaEye} />} colorScheme="cyan" mr={3}>
									View
								</Button>
								<Button onClick={loadData}  rightIcon={<Icon as={FaSyncAlt} />} colorScheme="blue" mr={3}>
									Refresh
								</Button>
							</Box>
						</Flex>
					</TableCaption>
					<Thead>
						<TableHeader></TableHeader>
					</Thead>
					<Tbody>
						<TableBody selected={selectedRowIndex} beers={beers} onRowSelect={onRowSelect}></TableBody>
					</Tbody>
					<Tfoot>
						<TableHeader></TableHeader>
					</Tfoot>
				</Table>
				<ViewBeer beer={selectedRow} isOpen={viewBeer.isOpen} onClose={viewBeer.onClose}></ViewBeer>
                <DeleteBeer refresh={loadData} isOpen={deleteBeer.isOpen} onClose={deleteBeer.onClose} beer={selectedRow}></DeleteBeer>
				<AddEditBeer refresh={loadData} beer={editmode? selectedRow: null} isOpen={addBeer.isOpen} onClose={addBeer.onClose}></AddEditBeer>
			</>
		);
	} else {
		return <Loader></Loader>;
	}
});
export default AdminBeers;
