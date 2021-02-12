CREATE TABLE IF NOT EXISTS [brewer] (
[pkUser] INTEGER,
[pkManufacturer] INT,
PRIMARY KEY (pkUser, pkManufacturer)
);

INSERT INTO [brewer] (
    [pkUser],
    [pkManufacturer]
) VALUES
(1,1);