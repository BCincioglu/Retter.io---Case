import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  userId: string;
  userName: string;
}

const UserSchema: Schema = new Schema({
  userId: { type: String, required: true, unique: true },
  userName: { type: String, required: true },
});

const User = mongoose.model<IUser>('User', UserSchema);

export default User;
