// src/modules/task.module.ts
import { CreateTaskUseCase } from '@/application/task/use-cases/create-task.usecase';
import { TaskController } from '@/infra/controller/task/create-task.controller';
import { TaskTypeormRepository } from '@/infra/database/typeorm/to-do/repositories/task-typeorm.repository';
import { Module } from '@nestjs/common';

@Module({
  controllers: [TaskController], // controller que lida com as requisições HTTP
  providers: [
    {
      provide: 'ITaskRepository',
      useClass: TaskTypeormRepository, // injeta a implementação concreta
    },

    CreateTaskUseCase, // use-case injetado
  ],
  exports: [CreateTaskUseCase], // permite que o app.module ou outros módulos usem
})
export class TaskModule {}
