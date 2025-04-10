import clientPromise from "../../lib/connectDB";
import Add from "../../lib/model/Add";
export const config = {
  api: {
    bodyParser: false, // Disable default body parsing for file handling
  },
};


  export async function POST(req) {
  
  // const dat = await req.json();
   const dat = await req.json();
   const da = dat.data;
  
   let data = da.data;
  
   let skip = 0;
   let check = 6;
   let sort ;
   
   if(da.sort){
    console.log(data,da.sort,skip ,'dfgdgfd')
    skip = da.skip;
    sort  = da.sort;
    if(sort === "low"){
      sort = 1
    }else{
      sort = -1;
    }
    console.log(data,sort,skip ,'dfgdgfd')
    const result = await Add.find({
      "info.category": { $regex: new RegExp("^" + data + "$", "i") }
    }).limit(12).sort({ "info.price" : sort }).skip(skip).exec();
    
     const count = await Add.countDocuments({
      "info.category": { $regex: new RegExp("^" + data + "$", "i") }
    }).sort({ "info.price" : sort }).exec()
     console.log(result.length,"successfull saved in the mongodb")
  
  
  if(result){
      return Response.json({result,count});
  }else{
      return Response.json({message:"error in sending"});
  }
  

   }
   if(da.check){
   check = 12;
   
   if(da.skip === 1){
    skip =0
   }else{
    skip = da.skip*12;
   }
 
   }else{
    check = 6;
   
   }
   

   console.log(data,da,"entering into dpost req and the datais");
   
  
  
   const result = await Add.find({
    "info.category": { $regex: new RegExp("^" + data + "$", "i") }
  }).limit(check).skip(skip).exec();
  
   const count = await Add.countDocuments({
    "info.category": { $regex: new RegExp("^" + data + "$", "i") }
  }).exec()
   console.log(result.length,"successfull saved in the mongodb")


if(result){
    return Response.json({result,count});
}else{
    return Response.json({message:"error in sending"});
}


   
  }