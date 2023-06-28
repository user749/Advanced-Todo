import mongoose from "mongoose";

const dbConnect = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });

    console.log(`Connection to DB successfully ${connect.connection.host}`);
  } catch (error) {
    console.log(`Connection to DB Failed ${error.message}`);
  }
};

export default dbConnect;

/*
By setting useUnifiedTopology to true, 
Mongoose will use the new Server Discovery and Monitoring engine for MongoDB,
which provides improved functionality for handling replica sets and sharded clusters. 
Setting useNewUrlParser to true allows Mongoose to use the new URL parser.
*/
