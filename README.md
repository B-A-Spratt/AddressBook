# AddressBook

Objective:

	Create an address book with CRUD functionality using Angular 6 and SQL Server.

Requirements:

	Design of UI of your own judgement that contains the following fields:
		first name (required)
		last name
		phone # (required)
		phone type (drop-down) required
			vaues: mobile, work, home
		group (drop-down)
			values: family, friend, work
	
	When saving or editing a record:
		validate all fields
			if errors, show bootstrap alert
			errors highlighted in red
		saves data once validation is passed
		display the netered values in a pop up
	
	Validating user input:
		check for required fields
		min length of first and last name, 5 chars
		validate phone number format
	
	Database tables
		design and create the necessary tables

## Built With

* [Asp.net Core](https://docs.microsoft.com/en-us/aspnet/core/?view=aspnetcore-2.2) - AebAPI
* [Angular](https://angular.io/) - Frontend
* [Sql Server](https://www.microsoft.com/en-us/sql-server/sql-server-2017) - Backend

## Author

* B.A. Spratt


# WebAPI

This project was made with [Asp.net Core](https://docs.microsoft.com/en-us/aspnet/core/?view=aspnetcore-2.2) version 2.2.

## Development server

Open the project and run without debugging. Visual studio with create an ISS instance that the FrontEnd can connect to.

Known Issue: you may need to navigate to localhost:5000, and potentially localhost:5000/api/addresses due to a CORS error.
When first starting FrontEnd, CORS will block access to the API. Manually navigating to the API address first seems to fix the issue.


# FrontEnd

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.0.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
