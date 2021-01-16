var db = {
	manufacturers: [
		{
			label: "Opel",
			pkManufacturer: 1,
			models: [
				{
					label: "Astra",
					pkModel: 1,
					parts: [
						{
							label: "Set zupčastog remena",
							pkPart: 1,
							fullDetails: "Set zupčastog remena 49428 - Opel. Broj zubaca 169, Širina 20 mm, sa okruglim profilom zubaca zupcanika.",
							details: "Komplet set zupčastog remena\nUključuje vodenu pumpu, remen i natezače remena",
							price: "799",
							year: "1991-2001",
						},
						{
							label: "Letva volana",
							pkPart: 2,
							fullDetails: 'Letva volana Opel Astra, godište: 91-. Cijena vrijedi samo u slučaju povratka istog starog artikla. U slučaju da nemate stari proizvod odnosno da je oštećen u košarici označite polje "bez vračanja starog proizvoda". ',
							details: "Odgovara na sve Astre F: kabrio, karavan, sedan",
							price: "834",
							year: "1991-2001",
						},
					],
				},
				{
					label: "Vectra",
					pkModel: 2,
					parts: [
						{
							label: "Prednje maglenke",
							pkPart: 3,
							fullDetails: "Maglenka za Opel Vectra A Godište: 1991-1998",
							details: "",
							price: "100",
							year: "1991-1998",
						},
					],
				},
			],
		},
		{
			label: "BMW",
			pkManufacturer: 2,
			models: [
				{
					label: "E30",
					pkModel: 3,
					parts: [
						{
							label: "Zadnja leptir stakla LD",
							pkPart: 4,
							fullDetails: "Prodajem leptir stakla za bmw e30, zeleno tonirana,\nstakla nisu oštećena, kederi ko novi, dolaze sa svime što je\npotrebno za ugradnju, znači nefali ništa kompletna su,\nstakla su na autu još, mogu se probat i vidit,\nmolim da zovu samo ozbiljni",
							details: "Leptir stakla za coupe varijantu, dolaze u paru",
							price: "2846",
							year: "1960-1960",
						},
					],
				},
				{
					label: "E46",
					pkModel: 4,
					parts: [
						{
							label: "Kiler 328i",
							pkPart: 5,
							fullDetails:
								"Serijski E30 krit hladnjaka nepaše u kombinaciji sa ovim proizvodom. Ovaj proizvod ja namjenjen za vozila sa manualnim i automatičkim mjenjačom. Sadrži držače za hladnjak ulja automatičke getribe.\n\nSvi snažni hladnjaci Mishimoto izrađeni su od čvrstog zrakoplovnog aluminija.\nMishimoto radijator može riješiti vaše probleme hlađenja kvalitetnim aluminijskim radijatorom.\nMishimoto aluminijski radijator stvaranjem 30% većeg hlađenja daje vozilu učinkovitiji rad motora i na taj način sprečava pregrijavanje motora.",
							details: "Kiler za varijantu 328i, veći nego original\nManje će prokuvat",
							price: "2749",
							year: "2002-2009",
						},
					],
				},
			],
		},
		{
			label: "Volkswagen",
			pkManufacturer: 3,
			models: [
				{
					label: "Golf",
					pkModel: 5,
					parts: [
						{
							label: "Servo pumpa Golf 3",
							pkPart: 6,
							fullDetails: "Servo pumpa za VW Golf III,\nGodište: 92-98,\nkataloški broj: 6N0145157X, 6N0145157, 6N0145154A",
							details: "Servo pumpa za Golf 3, električna",
							price: "974",
							year: "1992-1998",
						},
					],
				},
				{
					label: "Tiguan",
					pkModel: 6,
					parts: [
						{
							label: "DSG",
							pkPart: 7,
							fullDetails: "DSG sustav mjenjača, 7 brzina, brzina šalta 120ms",
							details: "DSG sustav mjenjača",
							price: "5862",
							year: "2007-2014",
						},
					],
				},
			],
		},
		{
			label: "Mazda",
			pkManufacturer: 4,
			models: [
				{
					label: "323F",
					pkModel: 7,
					parts: [],
				},
				{
					label: "RX-8",
					pkModel: 8,
					parts: [
						{
							label: "Wankel motor (rotary) 1.3",
							pkPart: 8,
							fullDetails: "JDM Mazda RX8 13B MSP Renesis Rotary Engine automatic 4port Engine",
							details: "Rotary motor 1.3, street port",
							price: "14795",
							year: "2004-2011",
						},
					],
				},
			],
		},
    ],
    parts: [
        {
            label: "Wankel motor (rotary) 1.3",
            pkPart: 8,
            fullDetails: "JDM Mazda RX8 13B MSP Renesis Rotary Engine automatic 4port Engine",
            details: "Rotary motor 1.3, street port",
            price: "14795",
            year: "2004-2011",
        },
        {
            label: "Set zupčastog remena",
            pkPart: 1,
            fullDetails: "Set zupčastog remena 49428 - Opel. Broj zubaca 169, Širina 20 mm, sa okruglim profilom zubaca zupcanika.",
            details: "Komplet set zupčastog remena\nUključuje vodenu pumpu, remen i natezače remena",
            price: "799",
            year: "1991-2001",
        },
        {
            label: "Letva volana",
            pkPart: 2,
            fullDetails: 'Letva volana Opel Astra, godište: 91-. Cijena vrijedi samo u slučaju povratka istog starog artikla. U slučaju da nemate stari proizvod odnosno da je oštećen u košarici označite polje "bez vračanja starog proizvoda". ',
            details: "Odgovara na sve Astre F: kabrio, karavan, sedan",
            price: "834",
            year: "1991-2001",
        },
        {
            label: "Prednje maglenke",
            pkPart: 3,
            fullDetails: "Maglenka za Opel Vectra A Godište: 1991-1998",
            details: "",
            price: "100",
            year: "1991-1998",
        },
        {
            label: "Zadnja leptir stakla LD",
            pkPart: 4,
            fullDetails: "Prodajem leptir stakla za bmw e30, zeleno tonirana,\nstakla nisu oštećena, kederi ko novi, dolaze sa svime što je\npotrebno za ugradnju, znači nefali ništa kompletna su,\nstakla su na autu još, mogu se probat i vidit,\nmolim da zovu samo ozbiljni",
            details: "Leptir stakla za coupe varijantu, dolaze u paru",
            price: "2846",
            year: "1960-1960",
        },
        {
            label: "Kiler 328i",
            pkPart: 5,
            fullDetails:
                "Serijski E30 krit hladnjaka nepaše u kombinaciji sa ovim proizvodom. Ovaj proizvod ja namjenjen za vozila sa manualnim i automatičkim mjenjačom. Sadrži držače za hladnjak ulja automatičke getribe.\n\nSvi snažni hladnjaci Mishimoto izrađeni su od čvrstog zrakoplovnog aluminija.\nMishimoto radijator može riješiti vaše probleme hlađenja kvalitetnim aluminijskim radijatorom.\nMishimoto aluminijski radijator stvaranjem 30% većeg hlađenja daje vozilu učinkovitiji rad motora i na taj način sprečava pregrijavanje motora.",
            details: "Kiler za varijantu 328i, veći nego original\nManje će prokuvat",
            price: "2749",
            year: "2002-2009",
        },
        {
            label: "Servo pumpa Golf 3",
            pkPart: 6,
            fullDetails: "Servo pumpa za VW Golf III,\nGodište: 92-98,\nkataloški broj: 6N0145157X, 6N0145157, 6N0145154A",
            details: "Servo pumpa za Golf 3, električna",
            price: "974",
            year: "1992-1998",
        },
        {
            label: "DSG",
            pkPart: 7,
            fullDetails: "DSG sustav mjenjača, 7 brzina, brzina šalta 120ms",
            details: "DSG sustav mjenjača",
            price: "5862",
            year: "2007-2014",
        },
    ]
};


module.exports = db;
