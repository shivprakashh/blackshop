import clientPromise from "../../lib/connectDB";
import Add from "../../lib/model/Add"; 

export const config = {
  api: {
    bodyParser: false, // Disable default body parsing for file handling
  },
};

export async function GET(req) {
    const userAgent = req.headers.get("user-agent"); // Get User-Agent
    console.log("User-Agent:", userAgent); 
    return Response.json({ message: "Hello from GET method" });
  }
  
  export async function POST(req) {
  
   const da= await req.json();
   const data = da.num;
   console.log(data,"entering into dpost req and the datais");
try{


  const count = await Add.countDocuments();
console.log("Total number of items:", count);
let first15Items;
if(data === 1){
  first15Items = await Add.find({}, {
    profilepic: 1,  // Get the first image name (or all if you adjust this)
    info: 1,                    // Get the full 'info' object
    _id: 1                      // Include '_id'
  }).limit(15).exec();
  
}else{
 let skip = (data-1) * 15;
 first15Items = await Add.find({}, {
  profilepic: 1,  // Get the first image name (or all if you adjust this)
  info: 1,                    // Get the full 'info' object
  _id: 1                      // Include '_id'
}).skip(skip).limit(15).exec();

 
}

console.log("First 15 items:", first15Items);
const dat = {first15Items,count}

   return Response.json(dat);
}catch(error){
  console.log(error,"error in mongodb")
}
  return Response.json({message:"error in mongodb"})
  
  }