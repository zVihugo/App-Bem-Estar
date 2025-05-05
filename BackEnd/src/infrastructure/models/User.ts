import { UserProps } from '../../@types/UserProps';

export class User {
  constructor(private readonly props: UserProps) {}

  public static create(props: UserProps) {
    return new User(props);
  }

  public get id(): string {
    return this.props.id;
  }

  public get name(): string {
    return this.props.name;
  }

  public get email(): string {
    return this.props.email;
  }

  public getPassword(): string {
    return this.props.password;
  }

  public get dateOfBirth(): string {
    return this.props.dateOfBirth;
  }

  public get faculty(): string {
    return this.props.faculty;
  }

  public get course(): string {
    return this.props.course;
  }
}
