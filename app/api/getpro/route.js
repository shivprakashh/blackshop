import clientPromise from "../../lib/connectDB";
import { ObjectId } from "mongodb";
import Add from "../../lib/model/Add";
export const config = {
  api: {
    bodyParser: false, // Disable default body parsing for file handling
  },
};


  
  export async function POST(req) {
  
   const data = await req.json();
   console.log(data,"entering into dpost req and the datais");
try{
  
const result = await Add.find({ _id:data });


console.log("result",result);
   return Response.json(result);

}catch(error){
  console.log(error,"error in mongodb")
}
  return Response.json({message:"error in mongodb"})
  
  }