CREATE DATABASE AddressDB
GO

USE AddressDB

CREATE TABLE Address
(
	Id INT NOT NULL PRIMARY KEY IDENTITY,
	FirstName NVARCHAR(256) NOT NULL,
		CHECK(LEN(FirstName) >= 5),
	LastName NVARCHAR(256),
		CHECK(LEN(LastName) = 0 OR LEN(LastName) >= 5),
	PhoneNumber NVARCHAR(14) NOT NULL,
		CHECK([PhoneNumber] LIKE '[(][0-9][0-9][0-9][)][ ][0-9][0-9][0-9][-][0-9][0-9][0-9][0-9]'),
	PhoneType INT NOT NULL,
		CHECK(PhoneType >= 1 and PhoneType <= 3),
	[Group] INT NOT NULL,
		CHECK([Group] >= 1 and [Group] <= 4),
)
GO

CREATE PROC GetAddresses
AS
SET NOCOUNT ON
SELECT Id, FirstName, LastName, PhoneNumber, PhoneType, [Group]
FROM Address
GO

CREATE PROC GetAddress @Id INT
AS
SET NOCOUNT ON
SELECT Id, FirstName, LastName, PhoneNumber, PhoneType, [Group]
FROM Address
WHERE Id = @Id
GO

CREATE PROC PutAddress @Id INT, @FirstName NVARCHAR(256), @LastName NVARCHAR(256), @PhoneNumber NVARCHAR(14), @PhoneType INT, @Group INT
AS
SET NOCOUNT ON
UPDATE Address
SET FirstName = @FirstName, LastName = @LastName, PhoneNumber = @PhoneNumber, PhoneType = @PhoneType, [Group] = @Group
OUTPUT INSERTED.Id, INSERTED.FirstName, INSERTED.LastName, INSERTED.PhoneNumber, INSERTED.PhoneType, INSERTED.[Group]
WHERE Id = @Id
GO

CREATE PROC PostAddress @FirstName NVARCHAR(256), @LastName NVARCHAR(256), @PhoneNumber NVARCHAR(14), @PhoneType INT, @Group INT
AS
SET NOCOUNT ON
INSERT INTO Address (FirstName, LastName, PhoneNumber, PhoneType, [Group])
OUTPUT INSERTED.Id, INSERTED.FirstName, INSERTED.LastName, INSERTED.PhoneNumber, INSERTED.PhoneType, INSERTED.[Group]
VALUES (@FirstName, @LastName, @PhoneNumber, @PhoneType, @Group)
GO

CREATE PROC DeleteAddress @Id INT
AS
SET NOCOUNT ON
DELETE FROM Address
OUTPUT DELETED.Id, DELETED.FirstName, DELETED.LastName, DELETED.PhoneNumber, DELETED.PhoneType, DELETED.[Group]
WHERE Id = @Id
GO

EXEC PostAddress @FirstName = 'Rocky', @LastName = '', @PhoneNumber = '(123) 456-7890', @PhoneType = 3, @Group = 2
GO
EXEC PostAddress @FirstName = 'Mickey', @LastName = 'Goldmill', @PhoneNumber = '(456) 789-0123', @PhoneType = 2, @Group = 3
GO
EXEC PostAddress @FirstName = 'Apollo', @LastName = 'Creed', @PhoneNumber = '(789) 012-3456', @PhoneType = 1, @Group = 4
GO
