import isEmail from 'validator/lib/isEmail';
import { IUser } from './IUser';

export class UserValidation implements IUser {
  public name: string;
  public email: string;
  public password: string;
  public type: string;
  private errors: string[] = [];

  validate(props: IUser) {
    Object.assign(this, props);

    if (Object.values(this).includes(undefined)) {
      throw new Error('User requires name, email, password and type');
    }

    this.errors = [];

    if (this.name.length < 4 || this.name.length > 255) {
      this.errors.push('name must have between 4 and 255 characters');
    }

    if (!isEmail(this.email)) {
      this.errors.push('Invalid email');
    }

    if (this.password.length < 8 || this.name.length > 32) {
      this.errors.push('password must have between 8 and 32 characters');
    }

    if (this.errors.length > 0) {
      throw { name: 'Error', message: this.errors };
    }

    return true;
  }
}
