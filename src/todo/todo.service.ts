import { Injectable, NotFoundException } from "@nestjs/common";
import { Todo } from './todo.entity';
import { AddTodoDto } from "./dto/add-todo.dto";

@Injectable()
export class TodoService {
  todos: Todo[] = [
    { id: 1, name: 'todo 1', description: 'my first todo',createdAt: new Date() },
    { id: 2, name: 'todo 2', description: 'my second todo',createdAt: new Date() },
    { id: 3, name: 'todo 3', description: 'my third todo',createdAt: new Date() },
    { id: 4, name: 'todo 4', description: 'my fourth todo',createdAt: new Date() },
  ];
  getTodos(){
    return this.todos;
  }

  getTodo(id: number) {
    const foundTodo = this.todos.find((todo) => todo.id === id);
    if (foundTodo != null) {
      return foundTodo;
    }
    throw new NotFoundException(`Le todo d'id ${id} n'existe pas`);
  }

  addTodo(newTodo: AddTodoDto): Todo {
    const todo = new Todo();
    const { name, description } = newTodo;
    if (this.todos.length) {
      todo.id = this.todos[this.todos.length - 1].id + 1;
    } else {
      todo.id = 1;
    }
    todo.name = name;
    todo.description = description;
    todo.createdAt = new Date();
    this.todos.push(todo);
    return todo;
  }

  deleteTodo(id: number): any {
    const index = this.todos.findIndex((todo) => todo.id === id);
    if (index >= 0) {
      this.todos.splice(index, 1);
    } else {
      throw new NotFoundException(
        `Impossible de supprimer le todo avec l'id ${id}`,
      );
    }
    return {
      message: `Le todo d'id ${id} est supprimé`,
    };
  }

  updateTodo(id: number, newTodo: Partial<Todo>): Todo {
    const foundTodo = this.getTodo(id);
    foundTodo.description = newTodo.description ? newTodo.description : foundTodo.description;
    foundTodo.name = newTodo.name ? newTodo.name : foundTodo.name;
    return foundTodo;
  }
}
