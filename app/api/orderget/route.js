
import Purchase from "../../lib/model/purchase";

export const config = {
  api: {
    bodyParser: false, // Disable default body parsing for file handling
  },
};

export async function POST(req) {
  try {
    const da = await req.json();
    const orderid = da.orderid;
    console.log(orderid,da,"Entering into POST request to fetch purchases...");

    // Count total documents in the Purchase collection
  
   

    // Fetch all purchase records from the collection
    const result = await  Purchase.findById(orderid).exec();

    console.log("Fetched purchases:", result);

    if (result) {
      return Response.json({ purchases: result });
    } else {
      return Response.json({ message: "No purchases found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Error fetching purchases:", error);
    return Response.json({ message: "Error in fetching purchases", error: error.message }, { status: 500 });
  }
}