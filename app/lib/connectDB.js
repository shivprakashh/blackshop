import mongoose from "mongoose";

const uri = "mongodb+srv://shivpraksh518:tcVLn5OBpk9MbNcb@cluster0.9m2r8.mongodb.net/shiv"; // Ensure database 'shiv' is used

if (!uri) throw new Error("MONGODB_URI is not defined in .env.local");

let clientPromise;

// Check if there is already a connection
if (!global._mongoClientPromise) {
  global._mongoClientPromise = mongoose.connect(uri, {
    useNewUrlParser: true,
 
  });
}

clientPromise = global._mongoClientPromise;

export default clientPromise;
