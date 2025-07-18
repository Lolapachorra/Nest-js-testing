import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { CreateTaskUseCase } from '@/application/task/use-cases/create-task.usecase';
import { CreateTaskDTOS } from '@/domain/task/dtos/createTask.dtos';
import { DeleteTaskUseCase } from '@/application/task/use-cases/delete-task.usecase';

@Controller('tasks')
export class TaskController {
  constructor(
    private readonly createTaskUseCase: CreateTaskUseCase,
    private readonly deleteTaskUseCase: DeleteTaskUseCase,
  ) {}

  @Post()
  async create(@Body() dto: CreateTaskDTOS) {
    const task = await this.createTaskUseCase.execute(dto);
    return task.toJSON();
  }

  @Delete(':taskId')
  async delete(@Param('taskId', ParseIntPipe) taskid: number) {
    await this.deleteTaskUseCase.execute(taskid);
    return { message: `Task ${taskid} deleted successfully.` };
  }
}
