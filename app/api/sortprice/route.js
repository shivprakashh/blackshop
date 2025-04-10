import Add from "../../lib/model/Add";
import clientPromise from "../../lib/connectDB"; // Your DB connection

export const config = {
  api: {
    bodyParser: false, // Disable default body parsing for file handling
  },
};

export async function POST(req) {
  // Parse the incoming request body
  const dat = await req.json();
  const da = dat.data;
  
  let data = da.query;
  let sort = da.sort;
  let skip = da.skip;
 if(sort === "low"){
    sort = 1
 }else{
    sort = -1;
 }

  // Determine pagination based on provided data
  if (da.skip) {
   
    
    // If the skip is 1, set skip to 0, else calculate the skip value based on pagination
    skip = da.skip ===  0 ? 0 : da.skip * 12;
  }

  // Log the input data and request data for debugging purposes
  console.log(data, da, "entering into POST req and the data is");

  try {
    // Create a query for searching in the 'detail' array and 'info.brand'
    const query = {
      $or: [
        {
          detail: {
            $elemMatch: {
              $regex: `^${data}`, // Use case-insensitive regex for 'detail' field
              $options: "i", // Case-insensitive search
            },
          },
        },
        {
          "info.brand": {
            $regex: `^${data}`, // Use case-insensitive regex for 'info.brand'
            $options: "i", // Case-insensitive search
          },
        },
      ],
    };

    // Perform the query to find the results with pagination
    const result = await Add.find(query).limit(12).sort({ "info.price" : sort }) .skip(skip).exec();
    
    // Count the total number of documents that match the query (for pagination)
    const count = await Add.countDocuments(query).exec();

    console.log(result.length, "successfully fetched data from MongoDB");

    // Return the results as a JSON response
    return Response.json({ result, count });
  } catch (error) {
    console.log("Error during the query:", error);

    // Return error message if something goes wrong
    return Response.json({ message: "Error in sending data" });
  }
}
