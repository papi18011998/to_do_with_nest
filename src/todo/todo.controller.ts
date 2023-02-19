import {
  Body, Controller,Delete,Get, NotFoundException,Param,Post,Put, Query,Req,Res} from '@nestjs/common';
import { Request, Response } from 'express';
import { Todo } from './todo.entity';
import { GetPaginatedTodo } from './dto/get-paginated-todo';
import { AddTodoDto } from './dto/add-todo.dto';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
  todos: Todo[];
  constructor(private todoService: TodoService) {}
  @Get()
  getTodos(@Query() queryParams: GetPaginatedTodo): Todo[] {
    return this.todoService.getTodos();
  }

  @Get('/:id')
  getTodo(@Param('id') id) {
    return this.todoService.getTodo(+id);
  }

  @Post()
  addTodo(@Body() newTodo: AddTodoDto): Todo {
    return this.todoService.addTodo(newTodo);
  }

  @Delete('/:id')
  deleteTodos(@Param('id') id) {
    return this.todoService.deleteTodo(+id);
  }
  @Put('/:id')
  updateTodo(@Param('id') id, @Body() newTodo: Partial<Todo>): Todo {
    return this.todoService.updateTodo(+id, newTodo);
  }
}
