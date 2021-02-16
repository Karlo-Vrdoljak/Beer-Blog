import { Badge, Box, Button, Center, Divider, Flex, Grid, GridItem, Heading, HStack, Icon, Image } from "@chakra-ui/react";
import Loader from "components/loader/Loader";
import SocialIcons from "components/social/SocialIcons";
import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import { FaBeer, FaFacebook, FaInstagram } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import ServiceContext from "context/ServiceProvider";



export function BeerImage(props) {
	return (
		<Flex background="white" borderTopRadius="lg">
			<Center w="100%">
				<Image borderTopRadius="0.5rem" src={props.url} h="64"></Image>
			</Center>
		</Flex>
	);
}

export function Beer(props) {

	const beer = props.beer;
	return (
		<Box p="6">
			<Heading fontSize="2xl">{beer.beerName}</Heading>
			<Divider pt="2" />
			<Box py="2" d="flex" alignItems="baseline" justifyContent="space-between">
				<Badge borderRadius="md" color={beer.color} px="2" colorScheme="dark" fontSize="2xl" fontWeight="medium" letterSpacing="wide">
					{beer.style}
				</Badge>
				<Box color="gray.400" fontWeight="light" letterSpacing="wide" fontSize="3xl" textTransform="uppercase" ml="2">
					{beer.beerPrice} {beer.currencySymbol}
				</Box>
			</Box>
			<Box pb="2" d="flex" alignItems="baseline" justifyContent="space-between">
				<Badge borderRadius="md" px="2" colorScheme="orange" fontSize="lg" fontWeight="medium" letterSpacing="wide">
					Alcohol percentage
				</Badge>
				<Box color="gray.400" fontWeight="light" letterSpacing="wide" fontSize="3xl" textTransform="uppercase" ml="2">
					{beer.beerAlcoholPerc} %
				</Box>
			</Box>
		</Box>
	);
}

function BeerType(props) {
	const beer = props.beer;
	return (
		<Box p="6">
			<Heading fontSize="2xl">{beer.manufName}</Heading>
			<Divider pt="2" />
			<Box py="2" d="flex" alignItems="baseline" justifyContent="space-between">
				<Badge borderRadius="md" color={beer.color} px="2" colorScheme="dark" fontSize="2xl" fontWeight="medium" letterSpacing="wide">
					Established on
				</Badge>
				<Box color="gray.400" fontWeight="light" letterSpacing="wide" fontSize="3xl" textTransform="uppercase" ml="2">
					{beer.manufYearOfEstablishment}
				</Box>
			</Box>
			<Box pb="2" d="flex" alignItems="baseline" justifyContent="space-between">
				<Badge borderRadius="md" px="2" colorScheme="orange" fontSize="lg" fontWeight="medium" letterSpacing="wide">
					{beer.countryName}
				</Badge>
				<Box color="gray.400" fontWeight="light" letterSpacing="wide" fontSize="3xl" textTransform="uppercase" ml="2">
					{beer.countryCode}
				</Box>
			</Box>
			<Box mt="1" fontWeight="semibold" lineHeight="tight">
				<Link to={"/manufacturer/beers/" + beer.pkManufacturer}>
					<Button rightIcon={<Icon as={FaBeer} />} colorScheme="yellow" variant="outline">
						Show {beer.manufName}'s beers
					</Button>
				</Link>
			</Box>
		</Box>
	);
}

const SingleBeer = observer(() => {
	const appService = React.useContext(ServiceContext);

	// @ts-ignore
	let { id } = useParams();

	const [beer, setBeer] = useState(() => {
		return null;
	});

	useEffect(() => {
		appService.beerService.getSingleBeerDetailed(id).then(data => setBeer(data));
	}, [id]);
	console.log(beer);
	if (beer) {
		const social = [
			{
				link: beer.manufFbUrl,
				color: "facebook",
				icon: <FaFacebook></FaFacebook>,
				label: "Facebook",
			},
			{
				link: beer.manufInstagramUrl,
				color: "pink",
				icon: <FaInstagram></FaInstagram>,
				label: "Instagram",
			},
			{
				link: beer.manufPageUrl,
				color: "yellow",
				icon: <FaBeer></FaBeer>,
				label: "Website",
			},
		];
		return (
			<Box w="100%">
				<Box mx="auto" w={["", "80%", "60%"]}>
					<Flex pt="4" px="4" justifyContent="center">
						<Grid borderWidth="1px" bg="gray.900" borderRadius="lg" m="4" templateColumns="repeat(2, 1fr)" gap="2">
							<GridItem>
								<Box>
									<BeerImage url={beer.manufLogoUrl}></BeerImage>
									<BeerType beer={beer}></BeerType>
								</Box>
							</GridItem>
							<GridItem>
								<Box>
									<BeerImage url={beer.beerImageUrl}></BeerImage>
									<Beer beer={beer}></Beer>
								</Box>
							</GridItem>
							<GridItem colSpan={2}>
								<Box px="6" fontWeight="semibold" fontSize="md" lineHeight="tight">
									<Box mt="1">{beer.manufDescription}</Box>
								</Box>
							</GridItem>
							<GridItem colSpan={2}>
								<HStack m="4">
									{social.map(s => (
										<SocialIcons key={s.link} link={s.link} color={s.color} icon={s.icon} label={s.label}></SocialIcons>
									))}
								</HStack>
							</GridItem>
						</Grid>
					</Flex>
				</Box>
			</Box>
		);
	} else {
		return <Loader></Loader>;
	}
});
export default SingleBeer;
