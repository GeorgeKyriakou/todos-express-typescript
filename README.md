## description

This repo is a test application for creating a TODO api with the [usage](#usage) and [requirements](#requirements) listed below.

It is based on [Node.JS](https://nodejs.org). with [express](https://expressjs.com/) and [typescript](https://www.typescriptlang.org/). For persisting data [DAO pattern](https://www.journaldev.com/16813/dao-design-pattern) for the sake of logic and storage separation, and everything is kept in a json file, under `/src/daos/MockDb/MockDb.json`

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

- Creating, reading, updating and deleting To Do items.
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

For the sake of usability, I have added a `completed` property which indicates wether the specific TODO has been done. On save, a random id is generated for the new entity, thus the final object looks like so:

```json
{
  "title": "foo",
  "description": "bar",
  "due_date": new Date(),
  "completed": false,
  "id": 123415362454
}
```

---

## endpoints

The following paths can be accessed in this api:

```
GET /api/todos/all
```

```
POST /api/todos/add
```

```
PUT /api/todos/update
```

```
DELETE /api/todos/delete/:id
```

---

## testing

Testing is done using jasmine, and the test code can be found under `/spec/Todos.spec.ts`

From the root folder, just run:

```
yarn test
```

---

## Misc

Greetings to whoever is reading this :)
