import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import { IUser } from '../../../entities/User/IUser';

const userSchema = new Schema<IUser>({
  _id: String,
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

userSchema.pre<IUser>('save', function (next) {
  const hashedPassword = bcrypt.hashSync(this.password, 8);
  this.password = hashedPassword;
  next();
});

export const UserModel = mongoose.model<IUser>('User', userSchema);
