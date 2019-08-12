import app from "@server";
import supertest from "supertest"; // https://github.com/visionmedia/supertest
import { Response, SuperTest, Test } from "supertest";
import { BAD_REQUEST, CREATED, OK } from "http-status-codes";

import { ITodo, Todo } from "@entities";
import { TodosDao } from "@daos";
import { pErr, paramMissingError } from "@shared";

describe("Todos Routes", () => {
  const todosPath = "/api/todos";
  const getTodosPath = `${todosPath}/all`;
  const addTodosPath = `${todosPath}/add`;
  const updateTodoPath = `${todosPath}/update`;
  const deleteTodoPath = `${todosPath}/delete/:id`;

  let request: SuperTest<Test>;

  beforeAll(done => {
    request = supertest.agent(app);
    done();
  });

  describe(`"GET:${getTodosPath}"`, () => {
    it(`should return a JSON object with all the todos and a status code of "${OK}" if the
            request was successful.`, done => {
      const todos = [
        new Todo({
          id: 1,
          title: "Test 1",
          description: "Description of test 1",
          due_date: new Date(),
          completed: false
        }),
        new Todo({
          id: 2,
          title: "Test 2",
          description: "Description of test 2",
          due_date: new Date(),
          completed: false
        }),
        new Todo({
          id: 3,
          title: "Test 3",
          description: "Description of test 3",
          due_date: new Date(),
          completed: false
        })
      ];

      spyOn(TodosDao.prototype, "getAll").and.returnValue(
        Promise.resolve(todos)
      );

      request.get(getTodosPath).end((err: Error, res: Response) => {
        pErr(err);
        expect(res.status).toBe(OK);
        const retTodos = res.body.todos.map((todo: ITodo) => {
          return new Todo(todo);
        });
        expect(retTodos).toEqual(todos);
        expect(res.body.error).toBeUndefined();
        done();
      });
    });

    it(`should return a JSON object containing an error message and a status code of
            "${BAD_REQUEST}" if the request was unsuccessful.`, done => {
      const errMsg = "Could not fetch todos.";
      spyOn(TodosDao.prototype, "getAll").and.throwError(errMsg);

      request.get(getTodosPath).end((err: Error, res: Response) => {
        pErr(err);
        expect(res.status).toBe(BAD_REQUEST);
        expect(res.body.error).toBe(errMsg);
        done();
      });
    });
  });

  describe(`"POST:${addTodosPath}"`, () => {
    const callApi = (reqBody: object) => {
      return request
        .post(addTodosPath)
        .type("form")
        .send(reqBody);
    };

    const todoData = {
      todo: new Todo({
        id: 4,
        title: "Test 4",
        description: "Description of test 4",
        due_date: new Date(),
        completed: false
      })
    };

    it(`should return a status code of "${CREATED}" if the request was successful.`, done => {
      spyOn(TodosDao.prototype, "add").and.returnValue(Promise.resolve());

      request
        .post(addTodosPath)
        .type("form")
        .send(todoData)
        .end((err: Error, res: Response) => {
          pErr(err);
          expect(res.status).toBe(CREATED);
          expect(res.body.error).toBeUndefined();
          done();
        });
    });

    it(`should return a JSON object with an error message and a status code of "${BAD_REQUEST}"
            if the request was unsuccessful.`, done => {
      const errMsg = "Could not add todo.";
      spyOn(TodosDao.prototype, "add").and.throwError(errMsg);

      callApi(todoData).end((err: Error, res: Response) => {
        pErr(err);
        expect(res.status).toBe(BAD_REQUEST);
        expect(res.body.error).toBe(errMsg);
        done();
      });
    });
  });

  describe(`"PUT:${updateTodoPath}"`, () => {
    const callApi = (reqBody: object) => {
      return request
        .put(updateTodoPath)
        .type("form")
        .send(reqBody);
    };

    const todoData = {
      todo: new Todo({
        id: 4,
        title: "Test 4",
        description: "Description of test 4",
        due_date: new Date(),
        completed: false
      })
    };

    it(`should return a status code of "${OK}" if the request was successful.`, done => {
      spyOn(TodosDao.prototype, "update").and.returnValue(Promise.resolve());

      callApi(todoData).end((err: Error, res: Response) => {
        pErr(err);
        expect(res.status).toBe(OK);
        expect(res.body.error).toBeUndefined();
        done();
      });
    });

    it(`should return a JSON object with an error message of "${paramMissingError}" and a
            status code of "${BAD_REQUEST}" if the todo param was missing.`, done => {
      callApi({}).end((err: Error, res: Response) => {
        pErr(err);
        expect(res.status).toBe(BAD_REQUEST);
        expect(res.body.error).toBe(paramMissingError);
        done();
      });
    });
  });

  describe(`"DELETE:${deleteTodoPath}"`, () => {
    const callApi = (id: number) => {
      return request.delete(deleteTodoPath.replace(":id", id.toString()));
    };

    it(`should return a status code of "${OK}" if the request was successful.`, done => {
      spyOn(TodosDao.prototype, "delete").and.returnValue(Promise.resolve());

      callApi(3).end((err: Error, res: Response) => {
        pErr(err);
        expect(res.status).toBe(OK);
        expect(res.body.error).toBeUndefined();
        done();
      });
    });
  });
});
