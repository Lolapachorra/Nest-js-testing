import {
  CreateTaskUseCase,
  DeleteTaskUseCase,
  GetTaskUseCase,
  UpdateTaskUseCase,
} from '@/application/task/use-cases';
import { CreateTaskDTOS } from '@/domain/task/dtos/createTask.dtos';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseArrayPipe,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

@Controller('tasks')
export class TaskController {
  constructor(
    private readonly getTaskUseCase: GetTaskUseCase,
    private readonly createTaskUseCase: CreateTaskUseCase,
    private readonly deleteTaskUseCase: DeleteTaskUseCase,
    private readonly updateTaskUseCase: UpdateTaskUseCase,
  ) {}

  @Post('/create')
  async create(@Body() dto: CreateTaskDTOS) {
    const task = await this.createTaskUseCase.execute(dto);
    return task.toJSON();
  }

  @Delete('/delete/:taskId')
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

  @Patch('/update/:taskId')
  async patch(
    @Body() dto: CreateTaskDTOS,
    @Param('taskId', ParseIntPipe) taskId: number,
  ) {
    await this.updateTaskUseCase.execute(taskId, dto);
    return { message: `Task ${taskId} updated successfully.` };
  }
}
