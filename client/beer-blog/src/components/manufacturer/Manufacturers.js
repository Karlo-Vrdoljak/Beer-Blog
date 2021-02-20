import { Badge, Box, Button, Center, Divider, Flex, Heading, HStack, Icon, Image, SimpleGrid } from "@chakra-ui/react";
import Loader from "components/loader/Loader";
import SocialIcons from "components/social/SocialIcons";
import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import { FaBeer, FaFacebook, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";
import ServiceContext from "context/ServiceProvider";


export function Manufacturer (props) {
	const social = [
		{
			link: props.fbUrl,
			color: "facebook",
			icon: <FaFacebook></FaFacebook>,
			label: "Facebook",
		},
		{
			link: props.instagramUrl,
			color: "pink",
			icon: <FaInstagram></FaInstagram>,
			label: "Instagram",
		},
		{
			link: props.pageUrl,
			color: "yellow",
			icon: <FaBeer></FaBeer>,
			label: "Website",
		},
	];
	return (
		<Box key={props.pkManufacturer} maxW="sm" overflow="hidden" borderWidth="1px" bg="gray.900" borderRadius="lg">
			<Flex background="white">
				<Center w="100%">
					<Image src={props.logoUrl} h="64"></Image>
				</Center>
			</Flex>
			<Box p="6">
				<Heading fontSize="2xl">{props.name}</Heading>
				<Divider pt="2" />
				<Box py="2" d="flex" alignItems="baseline" justifyContent="space-between">
					<Badge borderRadius="md" px="2" colorScheme="yellow" fontSize="2xl" fontWeight="medium" letterSpacing="wide">
						Established on
					</Badge>
					<Box color="gray.400" fontWeight="light" letterSpacing="wide" fontSize="3xl" textTransform="uppercase" ml="2">
						{props.yearOfEstablishment}
					</Box>
				</Box>
				<Box pb="2" d="flex" alignItems="baseline" justifyContent="space-between">
					<Badge borderRadius="md" px="2" colorScheme="orange" fontSize="lg" fontWeight="medium" letterSpacing="wide">
						{props.countryName}
					</Badge>
					<Box color="gray.400" fontWeight="light" letterSpacing="wide" fontSize="3xl" textTransform="uppercase" ml="2">
						{props.countryCode}
					</Box>
				</Box>
				<Box mt="1" fontWeight="semibold" lineHeight="tight">
					<Link to={"/manufacturer/beers/" + props.pkManufacturer}>
						<Button rightIcon={<Icon as={FaBeer} />} colorScheme="yellow" variant="outline">
							Show {props.name}'s beers
						</Button>
					</Link>
				</Box>
				<Box mt="1" fontWeight="semibold" lineHeight="tight">
					{/* <Heading fontSize="xl">{props.name}</Heading> */}
					<Box mt="1">{props.description}</Box>
				</Box>
				<HStack mt={4}>
					{social.map(s => (
						<SocialIcons key={s.link} link={s.link} color={s.color} icon={s.icon} label={s.label}></SocialIcons>
					))}
				</HStack>
			</Box>
		</Box>
	);
}


const Manufacturers = observer(() => {
	const appService = React.useContext(ServiceContext);
	const [manuf, setManuf] = useState(() => {
		return null;
	});

	useEffect(() => {
		appService.manufService.getBeerManufacturersDetailed().then(data => setManuf(data));
	}, []);
    console.log(manuf);

	if (manuf) {
		if (manuf.length > 0) {
			return (
				<SimpleGrid m="4" justifyItems="center" columns={[1, 2, 3]} spacing="6">
					{manuf.map(m => <Manufacturer key={m.pkManufacturer}  {...m} />)}
				</SimpleGrid>
			);
		} else {
			return (
				<Flex alignItems="center" w="100%" h="90vh" justifyContent="center">
					<Box>
						<Heading>No Manufacturers found!</Heading>
					</Box>
				</Flex>
			);
		}
	} else {
		return <Loader></Loader>;
	}
});
export default Manufacturers;
