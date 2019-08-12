export interface ITodo {
  id?: number;
  description: string;
  completed: boolean;
}

export class Todo implements ITodo {
  public id?: number;
  public description: string;
  public completed: boolean;

  constructor(todo: ITodo) {
    this.description = todo.description;
    this.completed = todo.completed;
  }
}
