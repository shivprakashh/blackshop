import clientPromise from "../../lib/connectDB";
import { ObjectId } from "mongodb";
import Add from "../../lib/model/Add";

export const config = {
  api: {
    bodyParser: false, // Disable default body parsing for file handling
  },
};


  export async function POST(req) {
  
   const data =await req.json();

   console.log(data,"entering into dpost req and the datais");
   

   const result =  await Add.deleteOne({ _id: data });
   console.log(result,"successfull delete")


if(result){
    return Response.json({message:"successfully delete"});
}else{
    return Response.json({message:"error in deleting"});
}


   
  }