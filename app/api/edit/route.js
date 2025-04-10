import clientPromise from "../../lib/connectDB";
import { ObjectId } from "mongodb";
import Add from "../../lib/model/Add"
export const config = {
  api: {
    bodyParser: false, // Disable default body parsing for file handling
  },
};


  
  export async function POST(req) {
  
   const data = await req.json();
  
   try{
   
   }catch(error){
    console.log(error)
   }
   console.log(data,"entering into dpost req and the datais");
   if(data.typ === "detail"){
    let name = data.name;
    let id = data.id;
    const result = await Add.updateOne(
        { _id: id }, // Find the document by _id
        { $pull: { detail: { name: name } } } // Remove the object where name = "thet"
    );
     
    console.log("result",result);
    return Response.json(result);
   }

   if(data.typ === "info"){
    let name = data.name;
   let value = data.value;
   let id = data.id;
    try{

      const result = await Add.updateOne(
        { _id: id},  // Find the document by _id
        { 
          $set: { 
           [`info.${name}`]: value  // Update the brand inside the info object
          }
        }
      );
      
      
      console.log("result",result);
         return Response.json(result);
      
      }catch(error){
        console.log(error,"error in mongodb")
      }
   }
  

  return Response.json({message:"error in mongodb"})
  
  }
  