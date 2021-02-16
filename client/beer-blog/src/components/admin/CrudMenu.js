import { AddIcon, ChevronDownIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import React from "react";


export function CrudMenu(props) {
	const menuItems = [
		props.add && !props.onlyEdit ? {
			label: "New " + props.text, icon: () => <AddIcon></AddIcon>, clickFunction: () => {
				props.switchMode(false);
				props.add.onOpen();
			}
		} : null,
		props.add ? {
			label: "Edit " + props.text, icon: () => <EditIcon></EditIcon>, clickFunction: () => {
				props.switchMode(true);
				props.add.onOpen();
			}
		} : null,
		props.delete ? { label: "Delete " + props.text, icon: () => <DeleteIcon></DeleteIcon>, clickFunction: () => props.delete.onOpen() }: null,
	].filter(i => i != null);

	return (
		<Menu>
			{({ isOpen }) => (
				<>
					<MenuButton isActive={isOpen} colorScheme="yellow" as={Button} rightIcon={<ChevronDownIcon />}>
						Tools
					</MenuButton>
					<MenuList>
						{menuItems.map((item, i) => (
							<MenuItem key={i} onClick={item.clickFunction} icon={item.icon()}>
								{item.label}
							</MenuItem>
						))}
					</MenuList>
				</>
			)}
		</Menu>
	);
}
