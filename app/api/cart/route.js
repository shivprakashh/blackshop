import clientPromise from "../../lib/connectDB";
import { ObjectId } from "mongodb"
import Add from "../../lib/model/Add";
export const config = {
  api: {
    bodyParser: false, // Disable default body parsing for file handling
  },
};




export async function POST(req) {
  // Parse incoming request body
  const data = await req.json();
  console.log(data, "entering into POST req and the data is");

  try {
    // Use Mongoose to handle the query
    // Convert the incoming 'data' array into an array of ObjectIds
    const objectIds = data.map(id => new ObjectId(id));
    console.log(objectIds, 'ObjectIds.........');

    // Query the 'Add' collection to find the documents by ObjectId
    const results = await Add.find({
      _id: { $in: objectIds },
    })
    .select('_id info profilepic')  // Only return the '_id', 'info' and first image from 'imagesname'
    .exec(); // Execute the query

    console.log(results, "this is the result");

    return Response.json(results); // Return the results as a JSON response
  } catch (error) {
    console.log(error, "error in mongoose query");

    // Return error message in case of failure
    return Response.json({ message: "Error in MongoDB query" });
  }
}