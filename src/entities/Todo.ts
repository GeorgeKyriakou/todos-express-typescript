export interface ITodo {
  id?: number;
  title: string;
  description: string;
  due_date: Date;
  completed: boolean;
}

export class Todo implements ITodo {
  public id?: number;
  public description: string;
  public title: string;
  public due_date: Date;
  public completed: boolean;

  constructor(todo: ITodo) {
    this.description = todo.description;
    this.completed = todo.completed;
    this.title = todo.title;
    this.due_date = new Date(todo.due_date);
  }
}
