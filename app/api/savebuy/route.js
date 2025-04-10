import Purchase from "../../lib/model/purchase"; // Import your Mongoose model
import Add from "../../lib/model/Add";  // Assuming Add is the product model
import { NextResponse } from "next/server";
export const config = {
  api: {
    bodyParser: false, // Disable default body parsing for file handling
  },
};

export async function POST(req) {
  try {
    const data = await req.json(); // Parse incoming JSON data
    
    if (!data || !data.length) {
        return NextResponse.json({ message: "Error in file uploading" }, { status: 500 });

    }
    
    console.log(data[0].id, "Received Data");
    const products = data[0].id; // Assuming this is the products array
    let result = [];let totalprice = 0;

    // Loop through each product in the array
    for (let item of products) {
      console.log("Processing Item:", item); // Log item to verify the structure
      const { product, quantity } = item;


      const productDetail = await Add.findById(product).exec();
      console.log("Product Details:", productDetail);
      
      if (!productDetail) {
         return NextResponse.json({ message: "product not found!" }, { status: 500 });
      }
      
      // Log product details
      console.log("Product Details:", productDetail);
      
      const originalPrice = parseFloat(productDetail.info.price);
      const discount = parseFloat(productDetail.info.discount);
      const discountAmount = (originalPrice * discount) / 100;
      const finalPrice = originalPrice - discountAmount;
      let profilepic = productDetail.profilepic;
    
      const totalPrice = finalPrice * quantity;
       totalprice += totalPrice;
      result.push({
        product: productDetail.info,
        quantity,
        originalPrice,
        discount,
        finalPrice,
        totalPrice,
        profilepic
      });
    }
    

    console.log(result, "Resulting Product Details");

    // Create new purchase record
    const newPurchase = new Purchase({
      user: data[0].userinfo, // Ensure correct user data is being passed
      products: result, // Array of product details with prices
      totalprice:totalprice
    });

    // Save the purchase to the database
    const savedPurchase = await newPurchase.save();
    console.log(savedPurchase, "Saved to MongoDB");

    // Return successful response

    return NextResponse.json({ message: "successfully saved!",result:savedPurchase._id }, { status: 200 });
  } catch (error) {
    console.error("Error in Purchase Save:", error);
    // Return error response
    return NextResponse.json({ message: "error!" }, { status: 500 });
  }
}
