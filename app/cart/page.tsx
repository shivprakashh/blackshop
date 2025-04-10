'use client'
import Image from "next/image";
import styles from "../components/com.module.css";
import Nav from "../components/nav";
import Adv from "../components/adv";
import Loading from "../components/loading"
import { useState, useEffect } from "react";
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import style from "./cart.module.css";
import Buy from "../product/buy";
import Noti from "../components/noti";



interface In{
    _id:string;
    info: {
      _id:string;
      brand:string;
      price: number;
      discount: number;
      stocks: string;
      quantity: number;
      finalprice: number;
      realprice:number;
    };
    imagesname:string[];
}

export default function ome() {
  const [noti,setnoti] = useState(false);
  const [txt,settxt] = useState("")
    const [data,setdata] = useState<In[] | []>([]);
    const [l,setl] = useState(false);
    const [total,settotal] = useState(0);
   
    const [check,setcheck] = useState(false);
    const [productId, setproductId] = useState<{product:string;quantity:number | string}[]>([]);
  useEffect(() => {
  async function call(){
    setl(true)
    let localdata: string | null  = localStorage.getItem("cart");
    if(localdata){
      
      await fetch(`${process.env.NEXT_PUBLIC_APIURL}/cart`,{method:"post",headers:{"Content-Type":"application/json"},body:localdata}).then(async(d)=>{
        const da = await d.json();
        console.log(da);
        let to:number = 0 ;
        for(let i=0;i<da.length;i++){
         if(da[i].info.discount){
          
          let real = Math.round((da[i].info.price/100)*(100 - da[i].info.discount));
          to+=real;
          da[i].info.realprice = real;
          da[i].info.finalprice = real;
         }else{
          to+=da[i].info.price;
          da[i].info.finalprice = da[i].info.price;
          da[i].info.checkprice = true;
          da[i].info.realprice = da[i].info.price;
         }
        
          da[i].info.quantity = 1;
          
        }
       setdata(da)
       setl(false)
       settotal(to)
      })
    }else{
      alert("no data in the cart")
    }
  }
 call()
  }, []);

function add(index:number){
  console.log(index);

  setdata((prev) =>
    prev.map((item, i) =>
      i === index
        ? {
            ...item,
            info: {
              ...item.info,
              quantity: item.info?.quantity ? item.info.quantity + 1 : 1,
              finalprice: item.info?.realprice ? item.info.realprice * (item.info.quantity+1) : 0 // Use `price` instead of `finalprice`
            }
          }
        : item // Keep other items unchanged
    )
  );
}
function minus(index:number){
  console.log(index);
console.log(data,"minus")
  setdata((prev) =>
    prev.map((item, i) =>
      i === index
        ? {
            ...item,
            info: {
              ...item.info,
              quantity: item.info?.quantity > 1 ? item.info.quantity - 1 : 1,
              finalprice: item.info?.finalprice > item.info.realprice ? item.info.finalprice - item.info.realprice : item.info.realprice   // Use `price` instead of `finalprice`
            }
          }
        : item // Keep other items unchanged
    )
  );
}
function deletelocal(index:string){

  console.log(data)
  let loca:string|null = localStorage.getItem("cart");
  let local:any[] = loca? JSON.parse(loca):[];

  let newlocal = local.filter((d:string)=> d !== index)
  localStorage.setItem("cart",JSON.stringify(newlocal))

  
  setdata((prev)=> prev.filter((u)=> u._id !== index ))
}
////inpop i made array of productid and quantity[{productId,quantity}]
function pop() {
  if (!data || data.length === 0) return; // Avoid errors if data is empty or undefined

  // Explicitly define the product type
  type ProductType = { product: string; quantity: number };

  let products: ProductType[] = data.map((item) => ({
    product: item._id,
    quantity: item.info.quantity,
  }));
console.log(products,"this products")
  setproductId(products); // Update state correctly
  setcheck(true); // Trigger UI update if needed
}

function handlepop(d:number){
 if(d === 0){
  setcheck(false)
  setnoti(true)
  settxt("successfully send , we will call you soon..")
 }
}
  return (<>
  
      <Nav value = {0}/>
     
       {noti && <Noti  text={txt} onClose={()=>settxt(" ")}/>}
      <div className={check?style.pophave:style.popnone}>
       <Buy datavalue={productId} handlepop={handlepop} />
      </div>
      {l&& <Loading/>}
      <div className={style.on}>
         
           {data && data.map((item:any,index)=>(
            <div key={index} className={style.cartopencon}>
                <img src={`/images/${item.profilepic}`} className={style.cartopenimg}></img>
                <div className={style.datacon}>
                <p className={style.brand}>{item.info.brand}</p>
                <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
               
              
               
                </div>
                
                <p>{item.info.stocks} stocks avilable</p>
                <p className={style.fprice}>{item.info.finalprice} ks </p>
               

                <div className={styles.delete}>
              
               <DeleteForeverIcon className={style.delete} onClick={()=>deletelocal(item._id)} />
               </div>
                 
                 
                <div className={style.increaseconinside}>
               <div className={style.iconcon}>
               <RemoveCircleIcon  className={styles.delecart} onClick={()=>minus(index)}/>
               </div>
                  <p className={style.quantity}>{item.info.quantity}</p>
                  <div className={style.iconcon}>
                  <AddCircleIcon className={styles.delecart} onClick={()=>add(index)}/>
                  </div>
               </div>
                
               
             
                </div>
            </div>
           ))}
         {data && 
           <div className={style.caculate}>
           {total&& <p style={{color:"orange",textAlign:"right",fontSize:"20px"}}>Total price : <span style={{color:"black",padding:"1px 5px"}}> ks</span></p>}
            <button onClick={pop} className={style.buy}>Buy</button>
          </div>
         }

        </div>
        
    
   </>
  );
}
