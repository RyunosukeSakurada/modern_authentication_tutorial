import mongoose from 'mongoose'

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL!)
    console.log("MongoDBと接続しています🎉")
  } catch (error) {
    console.error("MongoDB接続エラー:", error);
    console.log("MongoDBと接続されていません😭");
    process.exit(1)
  }
}

export default connectDB;