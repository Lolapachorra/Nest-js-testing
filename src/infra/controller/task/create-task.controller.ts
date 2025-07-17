import { Body, Controller, Post } from '@nestjs/common';
import { CreateTaskUseCase } from '@/application/task/use-cases/create-task.usecase';
import { CreateTaskDTOS } from '@/domain/task/dtos/createTask.dtos';

@Controller('tasks')
export class TaskController {
  constructor(private readonly createTaskUseCase: CreateTaskUseCase) {}

  @Post()
  async create(@Body() dto: CreateTaskDTOS) {
    const task = await this.createTaskUseCase.execute(dto);
    return task.toJSON();
  }
}
