import {
  Body, Controller,Delete,Get, NotFoundException,Param,Post,Put, Query,Req,Res} from '@nestjs/common';
import { Request, Response } from 'express';
import { Todo } from './todo.entity';
import { GetPaginatedTodo } from "./dto/get-paginated-todo";
import { AddTodoDto } from "./dto/add-todo.dto";

@Controller('todo')
export class TodoController {
  todos: Todo[];
  constructor() {
    this.todos = [
      { id: 1, name: 'todo 1', description: 'my first todo' },
      { id: 2, name: 'todo 2', description: 'my second todo' },
      { id: 3, name: 'todo 3', description: 'my third todo' },
      { id: 4, name: 'todo 4', description: 'my fourth todo' },
    ];
  }
  @Get()
  getTodos(@Query() queryParams: GetPaginatedTodo) {
    return this.todos;
  }

  @Get('/:id')
  getTodo(@Param('id') id) {
    const foundTodo = this.todos.find((todo) => todo.id === +id);
    if (foundTodo != null) {
      return foundTodo;
    }
    throw new NotFoundException(`Le todo d'id ${id} n'existe pas`);
  }

  @Post()
  addTodo(@Body() newTodo: AddTodoDto) {
    const todo = new Todo();
    const { name, description } = newTodo;
    todo.name = name;
    todo.description = description;
    if (this.todos.length) {
      todo.id = this.todos[this.todos.length - 1].id + 1;
    } else {
      todo.id = 1;
    }
    this.todos.push(todo);
    return todo;
  }

  @Delete('/:id')
  deleteTodos(@Param('id') id) {
    const index = this.todos.findIndex((todo) => todo.id === +id);
    if (index >= 0){
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
  @Put('/:id')
  updateTodo(@Param('id') id, @Body() newTodo: Partial<Todo>) {
    const foundTodo = this.getTodo(id);
    foundTodo.description = newTodo.description ? newTodo.description : foundTodo.description;
    foundTodo.name = newTodo.name ? newTodo.name : foundTodo.name;
    return foundTodo;
  }
}
