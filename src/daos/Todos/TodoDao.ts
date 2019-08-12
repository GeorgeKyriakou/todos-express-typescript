import { Todo, ITodo } from "@entities";

export interface ITodoDao {
  getAll: () => Promise<ITodo[]>;
  add: (user: Todo) => Promise<void>;
  update: (user: Todo) => Promise<void>;
  delete: (id: number) => Promise<void>;
}

export class TodosDao implements ITodoDao {
  /**
   *
   */
  public async getAll(): Promise<Todo[]> {
    // TODO
    return [] as any;
  }

  /**
   *
   * @param user
   */
  public async add(todo: Todo): Promise<void> {
    // TODO
    return {} as any;
  }

  /**
   *
   * @param user
   */
  public async update(todo: Todo): Promise<void> {
    // TODO
    return {} as any;
  }

  /**
   *
   * @param id
   */
  public async delete(id: number): Promise<void> {
    // TODO
    return {} as any;
  }
}
