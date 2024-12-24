import mongoose, { Schema, Document } from 'mongoose';

// Kullanıcı Modeli için arayüz
export interface IUser extends Document {
  userId: string;
  userName: string;
}

// Kullanıcı şeması
const UserSchema: Schema = new Schema({
  userId: { type: String, required: true, unique: true },
  userName: { type: String, required: true },
});

// Modeli oluştur
const User = mongoose.model<IUser>('User', UserSchema);

export default User;
