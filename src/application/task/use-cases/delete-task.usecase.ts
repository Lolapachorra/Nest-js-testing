import { ITaskRepository } from '@/domain/task/repositories/task.repository';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class DeleteTaskUseCase {
  constructor(
    @Inject('ITaskRepository')
    private readonly repository: ITaskRepository,
  ) {}

  async execute(taskId: number): Promise<void> {
    const existingTask = await this.repository.findTaskById(taskId);

    if (!existingTask) {
      throw new NotFoundException('Não foi encontrada task com esse id');
    }

    if (!existingTask.id) {
      throw new NotFoundException('Id invalido');
    }
    await this.repository.deleteTask(existingTask.id);
  }
}
