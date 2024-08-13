import mongoose from "mongoose";

let isConnect = false;

export const connectDB = async () => {
  mongoose.set('strictQuery', true);

  if (isConnect) {
    console.log('Mongo is already connected');
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: "Youtube_user"
    })
    console.log("mongoDB connected")
    isConnect = true;
  } catch (error) {
    console.log(error);
  }
}