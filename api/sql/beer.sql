CREATE TABLE IF NOT EXISTS [beer] (
[pkBeer] INTEGER PRIMARY KEY AUTOINCREMENT,
[price] FLOAT NULL,
[pkCurrency] INT NOT NULL,
[alcoholPerc] FLOAT NULL,
[pkBeerType] INT NOT NULL,
[pkManufacturer] INT NOT NULL,
[name] VARCHAR NULL,
[imageUrl] VARCHAR NULL
);

INSERT INTO [beer] (
    [price],
    [pkCurrency],
    [alcoholPerc],
    [pkBeerType],
    [pkManufacturer],
    [name],
    [imageUrl]
) VALUES
(21.0,45,5.5,3,1,"Hacker-Pschorr Weissbier", "https://www.hacker-pschorr.com/sites/default/files/styles/beer_detail/public/produktbild3/2018-02/hp_05_hefe%20weisse.com_.png?itok=jllQYX6S"),
(17.0,45,5.0,1,2,"Budweiser lager", "https://www.drinksupermarket.com/media/catalog/product/b/u/budweiser-premium-american-lager-beer-24-x-330-ml_temp.jpg"),
(19.0,45,4.7,11,2,"Budweiser dark", "https://www.drinksupermarket.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/b/u/budweiser-budvar-czech-lager-500ml-bottle_temp_1.jpg");