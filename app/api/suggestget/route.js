import clientPromise from "../../lib/connectDB";
import { ObjectId } from "mongodb"
import Add from "../../lib/model/Add"; 
import { NextResponse } from "next/server";

export const config = {
  api: {
    bodyParser: false, // Disable default body parsing for file handling
  },
};


  export async function POST(req) {
  
   const d = await req.json();
   const data = d.data;
   const type = d.type;

   console.log(data,type,"entering into dpost req and the datais");
  try{
    if(type === "cate"){
    
        let Items = await Add.find({ "info.category": data , status:"active" }).select("info profilepic").limit(5);
    
         console.log(Items,"resutl");
       
          return NextResponse.json({result: Items }, { status: 200 });
       }else{
     

        let Items = await Add.find({ "info.subcategory": data , status:"active" }).select("info profilepic").limit(5);
         console.log(Items,"resutl");
         return NextResponse.json({ result:Items }, { status: 200 });
        
       }
  }catch(error){

  }return NextResponse.json({message:"error"}, { status: 500 });
  
  
 
  }