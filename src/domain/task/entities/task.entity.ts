type TaskProps = {
  id?: number;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
};

type TaskCreateInput = Omit<TaskProps, 'id' | 'createdAt' | 'updatedAt'>;
type TaskRestoreInput = TaskProps;

export class Task {
  private _id?: number;
  private _title: string;
  private _description: string;
  private _createdAt: Date;
  private _updatedAt: Date;

  private constructor(props: TaskProps) {
    this._id = props.id;
    this._title = props.title;
    this._description = props.description;
    this._createdAt = props.createdAt;
    this._updatedAt = props.updatedAt;
  }

  public static create(props: TaskCreateInput): Task {
    return new Task({
      ...props,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  public static restore(props: TaskRestoreInput): Task {
    return new Task(props);
  }

  public get id(): number | undefined {
    return this._id;
  }

  public get title(): string {
    return this._title;
  }

  public get description(): string {
    return this._description;
  }

  public get createdAt(): Date {
    return this._createdAt;
  }

  public get updatedAt(): Date {
    return this._updatedAt;
  }

  public toJSON() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
