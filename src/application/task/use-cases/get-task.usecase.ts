import { Task } from '@/domain/task/entities/task.entity';
import { ITaskRepository } from '@/domain/task/repositories/task.repository';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class GetTaskUseCase {
  constructor(
    @Inject('ITaskRepository')
    private readonly repository: ITaskRepository,
  ) {}
  async execute(ids?: number[]): Promise<Task[]> {
    const tasks = await this.repository.getTasks(ids);

    if (!tasks.length) throw new NotFoundException('Tasks não encontradas');

    return tasks;
  }
}
