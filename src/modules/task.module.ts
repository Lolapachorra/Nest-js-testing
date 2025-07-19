import {
  CreateTaskUseCase,
  DeleteTaskUseCase,
  GetTaskUseCase,
  UpdateTaskUseCase,
} from '@/application/task/use-cases';
import { TaskController } from '@/infra/controller/task/task.controller';
import { TaskTypeormRepository } from '@/infra/database/typeorm/to-do/repositories/task-typeorm.repository';
import { Module } from '@nestjs/common';

@Module({
  controllers: [TaskController], // controller que lida com as requisições HTTP
  providers: [
    {
      provide: 'ITaskRepository',
      useClass: TaskTypeormRepository, // injeta a implementação concreta
    },

    CreateTaskUseCase,
    DeleteTaskUseCase,
    GetTaskUseCase,
    UpdateTaskUseCase,
    // use-case injetado
  ],
  exports: [
    CreateTaskUseCase,
    DeleteTaskUseCase,
    GetTaskUseCase,
    UpdateTaskUseCase,
  ], // permite que o app.module ou outros módulos usem
})
export class TaskModule {}
