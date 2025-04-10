import clientPromise from "../../lib/connectDB";
import { ObjectId } from "mongodb"
import Add from "../../lib/model/Add"; 

export const config = {
  api: {
    bodyParser: false, // Disable default body parsing for file handling
  },
};


  export async function POST(req) {
  
   const d = await req.json();
   const data = await d.productId

   console.log(data,d,"entering into dpost req and the datais");
   
  
  
   let Items = await Add.findById(data);

 

console.log("First 15 items:", Items);


    return Response.json(Items);
  }