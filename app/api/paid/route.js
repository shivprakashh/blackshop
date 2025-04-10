import clientPromise from "../../lib/connectDB";
import Add from "../../lib/model/Add"; 
import Purchase from "../../lib/model/purchase";

export const config = {
  api: {
    bodyParser: false, // Disable default body parsing for file handling
  },
};


  
  export async function PUT(req) {
  
   const data = await req.json();
   const {id,status,paid} = data;
   console.log(data,"entering into dpost req and the datais");
  try{
    const result = await Purchase.findByIdAndUpdate(
        id,
        { status: status, paid: paid }, // Update both fields
        { new: true } // Return the updated document
      );
      if(result){
        return Response.json({message:"successFull"})
      }
  }catch(error){

    return Response.json({message:"error in mongodb"})
  }


  
  }