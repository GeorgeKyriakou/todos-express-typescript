import { Todo, ITodo } from "@entities";
import { getRandomInt } from "@shared";
import { MockDaoMock } from "../MockDb/MockDao.mock";
import { ITodoDao } from "./TodoDao";

export class TodosDao extends MockDaoMock implements ITodoDao {
  public async getAll(): Promise<Todo[]> {
    try {
      const db = await super.openDb();
      return db.todos;
    } catch (err) {
      throw err;
    }
  }

  public async add(todo: ITodo): Promise<void> {
    try {
      const db = await super.openDb();
      todo.id = getRandomInt();
      db.todos.push(todo);
      await super.saveDb(db);
    } catch (err) {
      throw err;
    }
  }

  public async update(todo: ITodo): Promise<void> {
    try {
      const db = await super.openDb();
      for (let i = 0; i < db.todos.length; i++) {
        if (db.todos[i].id === todo.id) {
          db.todos[i] = todo;
          await super.saveDb(db);
          return;
        }
      }
      throw new Error("Todo not found");
    } catch (err) {
      throw err;
    }
  }

  public async delete(id: number): Promise<void> {
    try {
      const db = await super.openDb();
      for (let i = 0; i < db.todos.length; i++) {
        if (db.todos[i].id === id) {
          db.todos.splice(i, 1);
          await super.saveDb(db);
          return;
        }
      }
      throw new Error("Todo not found");
    } catch (err) {
      throw err;
    }
  }
}
