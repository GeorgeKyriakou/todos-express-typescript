import app from "@server";
import supertest from "supertest";

import { BAD_REQUEST, CREATED, OK } from "http-status-codes";
import { Response, SuperTest, Test } from "supertest";
import { ITodo, Todo } from "@entities";
import { TodosDao } from "@daos";
import { pErr, paramMissingError } from "@shared";

describe("Todos Routes", () => {
  const todosPath = "/api/todos";
  const getTodosPath = `${todosPath}/all`;
  const addTodosPath = `${todosPath}/add`;
  const updateUserPath = `${todosPath}/update`;
  const deleteUserPath = `${todosPath}/delete/:id`;

  let request: SuperTest<Test>;

  beforeAll(done => {
    request = supertest.agent(app);
    done();
  });

  describe(`"GET:${getTodosPath}"`, () => {
    it(`should return a JSON object with all the users and a status code of "${OK}" if the
            request was successful.`, done => {
      const todos = [
        new Todo({ id: 1, description: "test 1", completed: false }),
        new Todo({ id: 2, description: "test 2", completed: false }),
        new Todo({ id: 3, description: "test 3", completed: false })
      ];

      spyOn(TodosDao.prototype, "getAll").and.returnValue(
        Promise.resolve(todos)
      );

      request.get(getTodosPath).end((err: Error, res: Response) => {
        pErr(err);
        expect(res.status).toBe(OK);
        // Caste instance-objects to 'User' objects
        const retUsers = res.body.todos.map((todo: ITodo) => {
          return new Todo(todo);
        });
        expect(retUsers).toEqual(todos);
        expect(res.body.error).toBeUndefined();
        done();
      });
    });

    it(`should return a JSON object containing an error message and a status code of
            "${BAD_REQUEST}" if the request was unsuccessful.`, done => {
      const errMsg = "Could not fetch users.";
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
      todo: new Todo({ id: 4, description: "test 4", completed: false })
    };

    it(`should return a status code of "${CREATED}" if the request was successful.`, done => {
      spyOn(TodosDao.prototype, "add").and.returnValue(Promise.resolve());

      request
        .post(addTodosPath)
        .type("form")
        .send(todoData) // pick up here
        .end((err: Error, res: Response) => {
          pErr(err);
          expect(res.status).toBe(CREATED);
          expect(res.body.error).toBeUndefined();
          done();
        });
    });

    it(`should return a JSON object with an error message and a status code of "${BAD_REQUEST}"
            if the request was unsuccessful.`, done => {
      const errMsg = "Could not add user.";
      spyOn(TodosDao.prototype, "add").and.throwError(errMsg);

      callApi(todoData).end((err: Error, res: Response) => {
        pErr(err);
        expect(res.status).toBe(BAD_REQUEST);
        expect(res.body.error).toBe(errMsg);
        done();
      });
    });
  });

  describe(`"PUT:${updateUserPath}"`, () => {
    const callApi = (reqBody: object) => {
      return request
        .put(updateUserPath)
        .type("form")
        .send(reqBody);
    };

    const todoData = {
      todo: new Todo({ id: 4, description: "test 4", completed: true })
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
            status code of "${BAD_REQUEST}" if the user param was missing.`, done => {
      callApi({}).end((err: Error, res: Response) => {
        pErr(err);
        expect(res.status).toBe(BAD_REQUEST);
        expect(res.body.error).toBe(paramMissingError);
        done();
      });
    });
  });

  describe(`"DELETE:${deleteUserPath}"`, () => {
    const callApi = (id: number) => {
      return request.delete(deleteUserPath.replace(":id", id.toString()));
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
