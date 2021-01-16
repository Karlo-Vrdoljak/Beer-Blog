CREATE TABLE IF NOT EXISTS [manufacturer] (
[pkManufacturer] INTEGER PRIMARY KEY,
[yearOfEstablishment] INT NULL,
[pkCountry] INT NULL,
[description] VARCHAR NULL,
[logoUrl] VARCHAR NULL,
[fbUrl] VARCHAR NULL,
[instagramUrl] VARCHAR NULL,
[pageUrl] VARCHAR NULL
);

INSERT INTO [manufacturer] (
    [yearOfEstablishment],
    [pkCountry],
    [description],
    [logoUrl],
    [fbUrl],
    [instagramUrl],
    [pageUrl]
) VALUES
(
    1972,
    81,
    "Hacker-Pschorr is a brewery in Munich, formed in 1972 out of the merger of two breweries, Hacker and Pschorr. Hacker was founded in 1417, 99 years before the enactment of the Reinheitsgebot Purity Law of 1516.\n\nAs one of six breweries located within Munich's city limits, its beers are among those served at Oktoberfest.",
    "https://upload.wikimedia.org/wikipedia/en/thumb/a/a0/Hacker-Pschorr_logo.svg/220px-Hacker-Pschorr_logo.svg.png",
    "https://www.facebook.com/hackerpschorrmuenchen/",
    "https://www.instagram.com/hacker_pschorr/",
    "https://www.hacker-pschorr.com/hacker-pschorr"
),
(
    1876,
    230,
    "Introduced in 1876 by Carl Conrad & Co. of St. Louis, Missouri, Budweiser has become one of the largest-selling beers in the United States. The lager is available in over 80 countries, though not under the Budweiser name where Anheuser-Busch does not own the trademark. Budweiser is a filtered beer, available on draft and in bottles and cans, made (unlike the Czech lager) with up to 30% rice in addition to the hops and barley malt used by all lagers.",
    "https://upload.wikimedia.org/wikipedia/en/thumb/a/a0/Hacker-Pschorr_logo.svg/220px-Hacker-Pschorr_logo.svg.png",
    "https://www.facebook.com/BudweiserUSA/",
    "https://www.instagram.com/budweiserusa/",
    "https://www.budweiser.com"
),
(
    1869,
    58,
    "Staropramen Brewery (Pivovary Staropramen s.r.o.) is the second largest brewery in the Czech Republic, and is situated in the Smíchov district of Prague. It was founded in 1869 and the brand name Staropramen, literally meaning “old spring”, was registered in 1911. It is owned by Molson Coors and its products are exported to 37 different countries, mostly in Europe and North America.",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Staropramen_logo.svg/674px-Staropramen_logo.svg.png",
    "https://www.facebook.com/Staropramen.Slovenia/",
    "https://www.instagram.com/staropramen.beer/",
    "https://www.staropramen.com"
);