import mongoose from 'mongoose';
import Purchase from '../../lib/model/purchase'; // Import the Purchase model

async function getPurchasesOnSpecificDay() {
  try {
    const day = 20; // Specify the day (e.g., 12th)
    const month = 3; // January (months are zero-indexed: 0 = January, 1 = February, etc.)
    const year = 2025; // Specify the year

    // Create a Date object for the start of the day (12th January 2023 00:00:00)
    const startOfDay = new Date(year, month, day, 0, 0, 0, 0);

    // Create a Date object for the end of the day (12th January 2023 23:59:59)
    const endOfDay = new Date(year, month, day, 23, 59, 59, 999);

    // Query to find purchases made on that specific day
    const purchases = await Purchase.find({
      orderDate: { $gte: startOfDay, $lte: endOfDay } // Find documents between start and end of the day
    })
      .sort({ orderDate: -1 }); // Optionally sort by orderDate in descending order

    console.log(purchases);
    return Response.json({purchases})
    
  } catch (err) {
    console.error('Error fetching purchases for the specific day:', err);
  }
}
export const config = {
  api: {
    bodyParser: false, // Disable default body parsing for file handling
  },
};


  
  export async function POST(req) {
    getPurchasesOnSpecificDay();
  }




