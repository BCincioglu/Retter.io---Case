import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI as string);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(`Error: ${(err as Error).message}`);
    // process.exit(1); // Başarısız bağlantıda uygulamayı durdur
  }
};

export default connectDB;
