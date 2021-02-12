import { Badge, Box, Button, Center, Divider, Flex, Heading, Icon, Image } from "@chakra-ui/react";
import { observer } from "mobx-react";
import React from "react";
import { FaBeer } from "react-icons/fa";
import { Link } from "react-router-dom";

const Beer = observer(({ beer }) => {
	return (
		<Box maxW="sm" overflow="hidden" borderWidth="1px" bg="gray.900" borderRadius="lg">
			<Flex background="white">
				<Center w="100%">
					<Image src={beer.beerImageUrl} h="64"></Image>
				</Center>
			</Flex>
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
				{!beer.hideManufLink ? (
					<Box mt="1" fontWeight="semibold" lineHeight="tight">
						<Link to={"/manufacturer/beers/" + beer.pkManufacturer}>
							<Button rightIcon={<Icon as={FaBeer} />} colorScheme="yellow" variant="outline">
								Show {beer.manufName}'s beers
							</Button>
						</Link>
					</Box>
				) : (
					<></>
				)}

				<Box mt="1" fontWeight="semibold" lineHeight="tight">
					<Heading fontSize="xl">{beer.manufName}</Heading>
					<Box
						mt="1"
						// @ts-ignore
						noOfLines="4"
						isTruncated
					>
						{beer.manufDescription}
					</Box>
					<Box color="yellow.500">
						<Link to={"/beer/" + beer.pkBeer}>read more...</Link>
					</Box>
				</Box>
			</Box>
		</Box>
	);
});
export default Beer;
