import { NextResponse } from 'next/server';

import { writeFile } from 'fs/promises';
import clientPromise from "../../lib/connectDB";
import Add from '../../lib/model/Add';

export const config = {
  api: {
    bodyParser: false, // Disable default body parsing for file handling
  },
};



export async function POST(req, res) {
  let imagesname = [];
  const form = await req.formData();
  const details = form.get("detail");
  const infoo = form.get("info");
  const profile = form.get("profile")
  const info = JSON.parse(infoo);
  const detail = JSON.parse(details)
  const image = form.getAll("images")
  console.log(detail,"details..........");
  console.log(image,"imagess.............")
  console.log(info,"info.........")
  console.log(profile,"profile.........")
  let profilepic;
 try{
  if(profile){
   
      let bytedata = await profile.arrayBuffer();
      let buffer  = Buffer.from(bytedata)
      
      let time = Date.now();
      let random = Math.floor(Math.random()*1000000);
      let filex = profile.name.split(".").pop();
      let uniquename = `${time}-${random}.${filex}`;
       profilepic = uniquename;
     
      let path = `public/images/${uniquename}` 
      await writeFile(path,buffer);
      console.log("success")
    }

  if(image){
    for(let images of image){
      let bytedata = await images.arrayBuffer();
      let buffer  = Buffer.from(bytedata)
      
      let time = Date.now();
      let random = Math.floor(Math.random()*1000000);
      let filex = images.name.split(".").pop();
      let uniquename = `${time}-${random}.${filex}`;
      imagesname.push(uniquename)
     
      let path = `public/images/${uniquename}` 
      await writeFile(path,buffer);
      console.log("success")
    
    
    }

  }
   
   
   
   const data = {detail,imagesname,info,profilepic:profilepic};
   console.log(data,"ddddddddddddddddddddddddddddddddddddd")
   const newDate = new Add({
    imagesname:imagesname,
    info:info,
    detail:detail,
    profilepic:profilepic
   })
   const result = await newDate.save()
   console.log(result,"successfull saved in the mongodb")
   
  
 }catch(error){
  console.log(error)
  return NextResponse.json({ message: "Error in file uploading" }, { status: 500 });


 }
 console.log(imagesname,"this is images name array")

  
   // Send a successful response with the image paths
 
   return NextResponse.json({ message: "successfully saved!" }, { status: 200 });

 
  
}
