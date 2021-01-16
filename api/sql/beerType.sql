CREATE TABLE IF NOT EXISTS beerType (
pkBeerType INTEGER PRIMARY KEY AUTOINCREMENT,
color VARCHAR NULL,
style VARCHAR NULL,
imgUrl VARCHAR  NULL
);

INSERT INTO beerType (color,
style,
imgUrl) VALUES
('#fcf96b','Light lager','https://gumcreekbiergarten.files.wordpress.com/2019/05/20190524_1022591939692032-e1559157491212.jpg?w=788'),
('#f3f33f','Pilsner','https://www.edibleeastend.com/wp-content/uploads/sites/4/2019/03/Screen-Shot-2019-03-19-at-8.45.28-AM.png'),
('#f6d02e','Hefeweizen','https://www.beercartel.com.au/product_images/uploaded_images/weihenstephaner-main-pastemagazine.com.jpg'),
('#d1b825','American pale ale','https://upload.wikimedia.org/wikipedia/commons/3/3c/Sierra_Nevada_Pale_Ale.jpg'),
('#bca13d','Gueze','https://www.allagash.com/wp-content/uploads/Gose-Gueze-Blog-1-5.jpg'),
('#c57335','Extra special bitter','https://beermebc.com/wp-content/uploads/2019/07/P1010591-750x500.jpg'),
('#aa5e2e','English strong ale','https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Founders_Curmudgeon_%28Old_Ale%29.jpg/1200px-Founders_Curmudgeon_%28Old_Ale%29.jpg'),
('#904730','Red ale','https://cdn2.justwineapp.com/assets/article/2016/03/just-beer-amber-ale-dark-ale-red-ale-beer.jpg'),
('#6f3d1f','Dunkel','https://dxjcdxuv6chk2.cloudfront.net/assets/biere/dunkel/visual.jpg'),
('#401f1c','Porter','https://i.pinimg.com/originals/18/02/8d/18028da3e35d2cdbcfd8d2b9d5fcafea.png'),
('#211516','Stout','https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Stadin_Panimo_Double_Oat_Malt_Stout.jpg/1200px-Stadin_Panimo_Double_Oat_Malt_Stout.jpg'),
('#150d0d','Imperial stout','https://cdn.tasteatlas.com/images/ingredients/6b580a058cda4914ac1119ba9c338838.jpg?w=600&h=450');