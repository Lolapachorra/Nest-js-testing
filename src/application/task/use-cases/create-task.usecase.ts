import { CreateTaskDTOS } from '@/domain/task/dtos/createTask.dtos';
import { Task } from '@/domain/task/entities/task.entity';
import { ITaskRepository } from '@/domain/task/repositories/task.repository';

import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class CreateTaskUseCase {
  constructor(
    @Inject('ITaskRepository')
    private readonly repository: ITaskRepository,
  ) {}

  async execute(createTaskDto: CreateTaskDTOS): Promise<Task> {
    const taskInstance = Task.create(createTaskDto);

    const task = await this.repository.createTask(taskInstance);

    return task;
  }
}
