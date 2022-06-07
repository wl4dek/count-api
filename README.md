# count-api

This application will count the access number based on the authenticated user.

## How to run aplication

You can use [docker](https://www.docker.com/) or run the application on your machine.

### Steps to run the application

Clone this repository then enter the folder and install the dependencies

```
npm install
```

or

```
yarn
```

The database used was [postgresql](https://www.postgresql.org) so you will need to have it installed or you will need to use the docker mentioned above

You will need to point the application to the database. For that you need to put the uri in the environment variable `DATABASE_URL`.
Or you can create a `.env` file with this information. Example:

```
DATABASE_URL="postgresql://ton:approved_by_ton@localhost:5432/ton_db?schema=public"
```

After that we will need to run migrations that will create the tables in our database

```
yarn migrate

// Or

npm run migrate
```

Now you can run the application under development

```
yarn start:dev

// Or

npm run start:dev
```

With this the application will be running on port 3000 you will be able to see the api documentation [here](http://localhost:3000/docs/)

To run the tests:

```
yarn test

// Or
npm run test
```
