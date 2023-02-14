import { Controller, Delete, Get, Post, Put, Res } from "@nestjs/common";
import { Response } from "express";

@Controller('todo')
export class TodoController {
  @Get()
  getTodos(){
    return 'Liste des todos'
  }

  @Get('v2')
  getTodosV2(
    @Res() response: Response
  ){
    return response.json({
      contenu: 'Liste des todos'
    })
  }

  @Post()
  addTodo(){
    console.log('Ajouter un todos');
    return 'add todo';
  }

  @Delete()
  deleteTodos(){
    console.log('supprimer un todo');
    return 'delete todo';
  }
  @Put()
  updateTodo(){
    console.log('Modification todo');
    return 'modification de todo';
  }
}
