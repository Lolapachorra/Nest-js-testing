import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseArrayPipe,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { CreateTaskUseCase } from '@/application/task/use-cases/create-task.usecase';
import { CreateTaskDTOS } from '@/domain/task/dtos/createTask.dtos';
import { DeleteTaskUseCase } from '@/application/task/use-cases/delete-task.usecase';
import { GetTaskUseCase } from '@/application/task/use-cases/get-task.usecase';
@Controller('tasks')
export class TaskController {
  constructor(
    private readonly getTaskUseCase: GetTaskUseCase,
    private readonly createTaskUseCase: CreateTaskUseCase,
    private readonly deleteTaskUseCase: DeleteTaskUseCase,
  ) {}

  @Post('/create')
  async create(@Body() dto: CreateTaskDTOS) {
    const task = await this.createTaskUseCase.execute(dto);
    return task.toJSON();
  }

  @Delete(':taskId')
  async delete(@Param('taskId', ParseIntPipe) taskid: number) {
    await this.deleteTaskUseCase.execute(taskid);
    return { message: `Task ${taskid} deleted successfully.` };
  }

  @Get()
  async get(
    @Query(
      'ids',
      new ParseArrayPipe({
        optional: true,
        items: Number,
        separator: ',',
      }),
    )
    ids?: number[],
  ) {
    const tasks = await this.getTaskUseCase.execute(ids);

    return tasks.map((t) => t.toJSON());
  }
}
