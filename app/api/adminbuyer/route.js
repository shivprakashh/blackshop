import clientPromise from "../../lib/connectDB";
import Purchase from "../../lib/model/purchase";

export const config = {
  api: {
    bodyParser: false, // Disable default body parsing for file handling
  },
};

export async function POST(req) {
  try {
    console.log("Entering into POST request to fetch purchases...");

    // Count total documents in the Purchase collection
    const count = await Purchase.countDocuments();
    console.log("Total number of purchases:", count);

    // Fetch all purchase records from the collection
    const result = await Purchase.find({}).populate({
      path: 'products.product', // Path to the 'product' field within the 'products' array
      model: 'Add', // Ensure this matches the model name of your Add collection
      select: 'info profilepic', // Specify the fields you want to retrieve from the Add collection
    }).exec();

    console.log("Fetched purchases:", result);

    if (result.length > 0) {
      return Response.json({ count, purchases: result });
    } else {
      return Response.json({ message: "No purchases found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Error fetching purchases:", error);
    return Response.json({ message: "Error in fetching purchases", error: error.message }, { status: 500 });
  }
}