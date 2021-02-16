// @ts-nocheck
import { Avatar, Box, Button, Flex, Icon, Table, TableCaption, Tbody, Td, Tfoot, Th, Thead, Tr, useDisclosure } from "@chakra-ui/react";
import Loader from "components/loader/Loader";
import ServiceContext from "context/ServiceProvider";
import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import { FaEye, FaSyncAlt } from "react-icons/fa";
import AddEditBrewery from "./breweryCrud/AddEditBrewery";
import DeleteBrewery from "./breweryCrud/DeleteBrewery";
import RegisterBrewery from "./breweryCrud/RegisterBrewery";
import ViewBrewery from "./breweryCrud/ViewBrewery";
import { CrudMenu } from "./CrudMenu";

function TableHeader() {
	return (
		<Tr>
			<Th>Logo</Th>
			<Th>Brewery</Th>
			<Th>Country</Th>
			<Th isNumeric>Year of Est.</Th>
		</Tr>
	);
}

function TableBody(props) {
	const rowSelect = index => {
		return props.onRowSelect(props.breweries[index], index);
	};
	return (
		<>
			{props.breweries.map((b, i) => {
				return (
					<Tr bgColor={props.selected == i ? "blue.900" : null} key={i} onClick={() => rowSelect(i)}>
						<Td>
							<Avatar name={b.name} src={b.logoUrl} />
						</Td>
						<Td>{b.name}</Td>
						<Td>{b.countryName}</Td>
						<Td isNumeric>{b.yearOfEstablishment}</Td>
					</Tr>
				);
			})}
		</>
	);
}

const AdminBreweries = observer(() => {
	const [manuf, setManuf] = useState(() => {
		return null;
	});
	const addBrewey = useDisclosure();
	const viewBrewey = useDisclosure();
	const deleteBrewery = useDisclosure();
	const registerBrewey = useDisclosure();
	const [formFistStep, setformFistStep] = useState();

	const [selectedRowIndex, setselectedRowIndex] = useState(-1);
	const [selectedRow, setselectedRow] = useState(null);
	const [editmode, seteditmode] = useState(false);

	const onRowSelect = (row, i) => {
		setselectedRowIndex(i);
		setselectedRow(row);
		console.log(selectedRowIndex, selectedRow);
	};

	const appService = React.useContext(ServiceContext);

	const loadData = () => {
		return new Promise((resolve, reject) => {
			appService.manufService.getBeerManufacturersDetailed().then(data => {
				setManuf(data);
				resolve();
			});
		});
	};

	useEffect(() => {
		loadData();
	}, []);
	console.log(manuf);

	const onFirstStepDone = formValues => {
		setformFistStep(formValues);
		addBrewey.onClose();
		registerBrewey.onOpen();
	};
	const switchMode = (edit = false) => {
		if (edit) {
			seteditmode(true);
		} else {
			seteditmode(false);
		}
	};

	if (manuf) {
		return (
			<>
				<Table colorScheme="gray">
					<TableCaption placement="top">
						<Flex>
							<Box pr="2" fontSize="2xl">
								Breweries
							</Box>
							<Box>
								<CrudMenu text="brewery" add={addBrewey} delete={deleteBrewery} switchMode={switchMode}></CrudMenu>
								<Button onClick={viewBrewey.onOpen} ml={3} rightIcon={<Icon as={FaEye} />} colorScheme="cyan" mr={3}>
									View
								</Button>
								<Button onClick={loadData} rightIcon={<Icon as={FaSyncAlt} />} colorScheme="blue" mr={3}>
									Refresh
								</Button>
							</Box>
						</Flex>
					</TableCaption>
					<Thead>
						<TableHeader></TableHeader>
					</Thead>
					<Tbody>
						<TableBody selected={selectedRowIndex} breweries={manuf} onRowSelect={onRowSelect}></TableBody>
					</Tbody>
					<Tfoot>
						<TableHeader></TableHeader>
					</Tfoot>
				</Table>
				<AddEditBrewery editMode={editmode} brewery={selectedRow} refresh={loadData} isOpen={addBrewey.isOpen} onClose={addBrewey.onClose} completeFirstFormStep={onFirstStepDone}></AddEditBrewery>
				<RegisterBrewery refresh={loadData} data={formFistStep} isOpen={registerBrewey.isOpen} onClose={registerBrewey.onClose}></RegisterBrewery>
				<DeleteBrewery refresh={loadData} isOpen={deleteBrewery.isOpen} onClose={deleteBrewery.onClose} brewery={selectedRow}></DeleteBrewery>
				<ViewBrewery manuf={selectedRow} isOpen={viewBrewey.isOpen} onClose={viewBrewey.onClose}></ViewBrewery>
			</>
		);
	} else {
		return <Loader></Loader>;
	}
});
export default AdminBreweries;
