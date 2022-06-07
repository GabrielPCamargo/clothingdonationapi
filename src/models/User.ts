import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import isEmail from 'validator/lib/isEmail';
import jwt from 'jsonwebtoken';

export type UserData = {
  name: string;
  email: string;
  type: string;
  token: string;
};
interface UserType {
  name: string;
  email: string;
  password: string;
  type: string;
}

const userSchema = new Schema<UserType>({
  name: {
    type: String,
    minLength: [4, '{VALUE} has to have at least 4 characters'],
    maxLength: [255, '{VALUE} has to have between 8 and 255 characters'],
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    minLength: [8, '{VALUE} has to have at least 8 characters'],
    maxLength: [32, '{VALUE} has to have between 8 and 32 characters'],
  },
  type: String,
});

userSchema.pre<UserType>('save', function (next) {
  const hashedPassword = bcrypt.hashSync(this.password, 8);
  this.password = hashedPassword;
  next();
});

const UserModel = mongoose.model<UserType>('User', userSchema);

interface UserClass {
  create: () => Promise<UserType | undefined>;
  validate: () => boolean;
  getData: () => UserData;
  login: () => void;
}

export class User implements UserClass {
  public readonly errors: string[] = [];
  private data: UserType = {} as UserType;
  private token = '';
  constructor(private readonly body: UserType) {}

  async create() {
    if (!this.validate()) return;

    try {
      const data = new UserModel(this.body);
      await data.save();
      this.data = data;
      await this.login();
      return;
    } catch (error: any) {
      if (error.code == 11000) {
        this.errors.push('E-mail já utilizado');
      }
      return undefined;
    }
  }

  validate() {
    if (!(Object.keys(this.body).length > 0)) {
      this.errors.push('body is required');
      return false;
    }

    if (this.body.name.length < 4 || this.body.name.length > 255) {
      this.errors.push('name must have between 4 and 255 characters');
    }

    if (!isEmail(this.body.email)) {
      this.errors.push('Invalid email');
    }

    if (this.body.password.length < 8 || this.body.name.length > 32) {
      this.errors.push('password must have between 8 and 32 characters');
    }

    if (this.errors.length > 0) return false;

    return true;
  }

  getData() {
    const data = {
      name: this.data.name,
      email: this.data.email,
      type: this.data.type,
      token: this.token,
    };

    return data;
  }

  async login() {
    if (!this.body.email) return;
    const data = await UserModel.findOne({
      email: this.body.email,
    });

    if (data === null) {
      this.errors.push('User not found');
      return;
    }

    this.data = data;

    if (!bcrypt.compareSync(this.body.password, this.data.password)) {
      this.errors.push('Invalid password');
      return;
    }

    const token = jwt.sign(
      {
        name: this.data.name,
        email: this.data.email,
        type: this.data.type,
      },
      process.env.TOKEN_KEY as string,
      {
        expiresIn: process.env.TOKEN_EXPIRES_IN,
      }
    );

    this.token = token;
    return;
  }
}
