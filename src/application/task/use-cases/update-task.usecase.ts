import { CreateTaskDTOS } from '@/domain/task/dtos/createTask.dtos';
import { Task } from '@/domain/task/entities/task.entity';
import { ITaskRepository } from '@/domain/task/repositories/task.repository';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class UpdateTaskUseCase {
  constructor(
    @Inject('ITaskRepository')
    private readonly repository: ITaskRepository,
  ) {}
  async execute(taskId: number, updateTask: CreateTaskDTOS): Promise<void> {
    const taskInstance = Task.create(updateTask);
    const task = await this.repository.findTaskById(taskId);

    if (!task) throw new NotFoundException('Task não encontrada');

    await this.repository.updateTask(taskId, taskInstance);
  }
}
