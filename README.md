## description

This repo is a test application for creating a TODO api with the [usage](#usage) and [requirements](#requirements) listed below.

The application uses [typescript](https://www.typescriptlang.org/) for both the [Angular](https://angular.io) front end and the [Node.JS](https://nodejs.org) backend.

---

## usage

1. Install all dependencies by running the following in the root of this project ([Yarn](https://yarnpkg.com) needs to be installed as a prerequisite):

```
yarn install
```

2. build the application by running:

```
yarn build
```

3. start the application by running:

```
yarn start-dev
```

4. navigate to http://localhost:3000 or whatever host and port are configured in the server environment file. The console will detail the address in which it is running from.

---

## requirements

These are the requirements for the application.

- Creating, reading, updating and deleting To Do items. (done: backend Node|Express|TS - frontend Angular)
- Each item should have a title, description and a due date. There is no need for a database in the back-end, but you can use one if you want

```json
{
  "title": "foo",
  "description": "bar",
  "due_date": new Date()
}
```

- Sorting and Filtering/Searching for items
- Pagination and the ability to pre-populate the application with items

---

## testing

Testing is done using jasmine, and the test code can be found under `/spec/Todos.spec.ts`

to run the tests, from the root folder, just run:

```
yarn test
```

---

## Misc

Greetings to whoever is reading this :)
