'use client';
import { useState, useRef } from "react";
import styles from "./edit.module.css";
import CloseIcon from '@mui/icons-material/Close';



  
  // Define the type for the detail array
  interface Detail {
    name: string;
    value: string;
  }
  
  // Define the main object type
  interface Info {
    brand: string;
    price: string | number;
    discount: string | number;
    stocks: string | number;
    subcategory: string | number;
    category: string | number;
    tags: string | number;
  }
  interface Value{
    name:string;
    value:any;
  }
  
  interface In {
    _id: string;
    detail: { name: string; value: string }[];
    imagesname: string[];
    info: Info;
    status:string;
  }
  
export default function Edit(){
    const infoRef = useRef<HTMLInputElement | null>(null)
    const [check,setcheck] = useState(true);
    const [data, setdata] = useState<In | null>(null);
const idRef = useRef<HTMLInputElement | null>(null);
const [infov,setinfov] = useState<Value | null>(null);
const [infosend,setinfosend] = useState<Value[]>([])
    const [pop,setpop] = useState<number | null>(0);

    //infosend is the data to add and send;
    

async function delet(){
    setcheck(true)
    let id = idRef.current?.value;
    await fetch("/api/getpro",{method:"POST",body:JSON.stringify(id)}).then(async(d)=>{
        const dd = await d.json();
        setdata(dd[0])
        console.log(dd,"this is api response")
    })
}

function info(d:Value){
    setpop(1)
  setinfov(d)
  
}
function close(){
    setpop(null)
    
}
async function sendinfo(){
 let inputval = infoRef.current?.value;
 let inputid= infoRef.current?.id;
 let productid = idRef.current?.value;

 let dat ={name:inputid,value:inputval,typ:"info",id:productid};
 await fetch("/api/edit",{method:"POST",body:JSON.stringify(dat)}).then(async (d)=>{
    let dd = await d.json()
    alert(dd)
 })


 setpop(null)

}
////delete data
const [dels,setdels] = useState<string | null>(null)

function deletedetail (d:any){
    setpop(2)
    setdels(d)
  
}
async function dele(){
    let productid = idRef.current?.value;
    let da = {typ:"detail",id:productid,name:dels}
   await fetch("/api/edit",{method:"POST",body:JSON.stringify(da)}).then(async(d)=>{
    const dd = await d.json();
    alert(dd)
   })
    setpop(null)
}

    return(
        <div className={styles.right}>
        {pop === 1 && 
        <div className={styles.pop}>
            <CloseIcon onClick={close} className={styles.close}/>
       {infov && (
        <div className={styles.popcon}>
        <p>{infov.name}</p>
        <input ref={infoRef} id={infov.name} className={styles.deleteinput} type="text" placeholder={`${infov.value}`}></input>
        <button onClick={sendinfo} className={styles.deleteBut}>Set Data</button>
        </div>
       )
        
        }
        
        </div>
        }
         {pop === 2 && 
        <div className={styles.pop}>
             <CloseIcon onClick={close} className={styles.close}/>
            <button  className={styles.deleteBut} onClick={dele}>Delete thhis detail</button>
        </div>
        }
            <div className={styles.deletecon}>
        <input ref={idRef} className={styles.deleteinput} type="text" placeholder="poduct id"></input>
        <button className={styles.deleteBut} onClick={delet}>Edit Product</button>
        </div>
        {check && 
        <div className={styles.datacon}>
         {data && 
         <div key={data._id}> 
         <div className={styles.topcon}>
            <div className={styles.imgcon}>
                {data.imagesname&& data.imagesname.map((item,index)=>(
                 <img key={index} className={styles.img} src={`/images/${item}`}></img>
                ))}
            </div>
            <div className={styles.info}>
                {data.info&& 
                <div key={data._id} className={styles.infocon}>
                    <p onClick={()=>info({name:"brand",value:data.info.brand})} className={styles.infodata}>brand: {data.info.brand}</p>
                    <p onClick={()=>info({name:"price",value:data.info.price})} className={styles.infodata}>price: {data.info.price}</p>
                    <p onClick={()=>info({name:"discount",value:data.info.discount})} className={styles.infodata}>discount: {data.info.discount}</p>
                    <p onClick={()=>info({name:"stocks",value:data.info.stocks})} className={styles.infodata}>stocks: {data.info.stocks}</p>
                    <p onClick={()=>info({name:"subcategory",value:data.info.subcategory})} className={styles.infodata}>subcategory: {data.info.subcategory}</p>
                    <p onClick={()=>info({name:"status",value:data.status})} className={styles.infodata}>status: {data.status}</p>
                    <p onClick={()=>info({name:"category",value:data.info.category})} className={styles.infodata}>category: {data.info.category}</p>
                    <p onClick={()=>info({name:"tags",value:data.info.tags})} className={styles.infodata}>tags: {data.info.tags}</p>

                </div>
                }
            </div>
         </div>
          <div className={styles.detail}>
           {data.detail&& data.detail.map((item,index)=>(
             <div key={index} onClick={()=>deletedetail(item.name)} className={styles.detailcon}>
             <p className={styles.name}>{item.name}</p>
             <p className={styles.value}>{item.value}</p>
            </div>
           ))}
          </div>
         </div>
         }
        </div>
        }
        </div>

    )
}