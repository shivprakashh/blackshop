import clientPromise from "../../lib/connectDB";
import Purchase from "../../lib/model/purchase";

export const config = {
  api: {
    bodyParser: false, // Disable default body parsing for file handling
  },
};

export async function POST(req) {
  try {
    const dat = await req.json();
    const date = new Date(dat.date); // Convert frontend date to JS Date object
    console.log("Received date from frontend:", date);

    // Ensure date is valid
    if (isNaN(date.getTime())) {
      return Response.json({ message: "Invalid date format" }, { status: 400 });
    }

    // Create start and end of the day
    const startOfDay = new Date(date.setUTCHours(0, 0, 0, 0));  // 00:00:00
    const endOfDay = new Date(date.setUTCHours(23, 59, 59, 999)); // 23:59:59

    console.log("Filtering purchases between:", startOfDay.toISOString(), "and", endOfDay.toISOString());

    // Fetch purchases that fall within the date range
    const result = await Purchase.find({
      createdAt: { $gte: startOfDay, $lt: endOfDay }
    })
    .populate("user")
    .populate("products.product")
    .exec();

    

    if (result.length > 0) {
      return Response.json({ purchases: result });
    } else {
      return Response.json({ message: "No purchases found for this date" }, { status: 404 });
    }
  } catch (error) {
    console.error("Error fetching purchases:", error);
    return Response.json({ message: "Error in fetching purchases", error: error.message }, { status: 500 });
  }
}
