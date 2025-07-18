import { Task as DomainTask } from '@/domain/task/entities/task.entity';
import { ITaskRepository } from '@/domain/task/repositories/task.repository';
import { Repository } from 'typeorm';
import { Task as ORMTask } from '../entities/task';
import { toDo } from '../connection';
import { TaskMapper } from '../mappers/task.mapper';
import { DatabaseException } from '@/domain/shared/errors/database-custom.error';

export class TaskTypeormRepository implements ITaskRepository {
  private readonly repo: Repository<ORMTask>;
  constructor() {
    this.repo = toDo.getRepository(ORMTask);
  }

  async createTask(task: DomainTask): Promise<DomainTask> {
    try {
      const ormTask = this.repo.create({
        title: task.title,
        description: task.description,
        createdAt: task.createdAt,
        updatedAt: task.updatedAt,
      });

      const saved = await this.repo.save(ormTask);
      return TaskMapper.toEntity(saved);
    } catch (e) {
      let error: Error | undefined = undefined;

      if (e instanceof Error) {
        error = e;
      }

      throw new DatabaseException('Falha ao criar task', error);
    }
  }
  async deleteTask(taskId: number): Promise<void> {
    try {
      await this.repo.delete({ id: taskId });
    } catch (e) {
      let error: Error | undefined = undefined;

      if (e instanceof Error) {
        error = e;
      }

      throw new DatabaseException('Falha ao deletar task', error);
    }
  }
  async findTaskById(taskId: number): Promise<DomainTask | null> {
    try {
      const task = await this.repo.findOne({ where: { id: taskId } });

      if (!task) return null;

      return TaskMapper.toEntity(task);
    } catch (e) {
      let error: Error | undefined = undefined;

      if (e instanceof Error) {
        error = e;
      }

      throw new DatabaseException('Falha ao deletar task', error);
    }
  }
}
