"use client";
import styles from "./search.module.css"
import { useSearchParams } from "next/navigation";
import { useState,useEffect } from "react";
import Nav from "../components/nav";
import { useRouter } from "next/navigation";
import Loading from "../components/loading"
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Link from "next/link";
import Noti from "../components/noti";
import Pagi from "../components/pagi"
import { skSK } from "@mui/x-date-pickers/locales";
interface Info {
    brand: string;
    price: string;
    discount: string;
    stocks: string;
  }
    interface Item {
        _id: string;
        imagesname: string[];  // An array of image names
        info:Info;
      }
export default function SearchPage() {
    const [da,setda] = useState<Item[] | []>([])

  const searchParams = useSearchParams();
  const data = searchParams.get("query");
  const [txt,settxt] = useState("Wellcome!");
  const [notii,setnotii] = useState(false)
  const message= {data,check:true,skip:0};
  const [sk,setsk] = useState<any>(0);
  const [len,setlen]  = useState(0)
  const[l,setl] = useState(false)
  const [empty,setempty] = useState(false)
 async function api(){
  setda([]);
    setl(true)
   const result = await fetch("/api/startwith",{method:"POST",body:JSON.stringify(message)})
     const data = await result.json();
     console.log(data.result,data.count,"dataaa")
     setl(false)
     if(data.result.length){
      setda(data.result);
     setempty(false)
      setlen(data.count)
     }else{
setempty(true)
     }
    
  }
  useEffect(()=>{
       api()
  },[data])
  const router = useRouter();
 function Buy(d:string){
  
    router.push(`/product/${encodeURIComponent(d)}`)
 }
 function addtocart(productId:string){
    let local = localStorage.getItem("cart");
    if(local){
     let data = JSON.parse(local)
     setnotii(true)
        if(data.length < 10){
           if(data.includes(productId)){
             
             settxt("ALready in the Cart")
           }else{
             data.push(productId);
             settxt("successfully save in the cart")
             localStorage.setItem("cart",JSON.stringify(data))
           }
        }else{
          settxt("only 10 products you can buy at once")
         
        }
    }else{
      settxt("successfully save in the cart")
     localStorage.setItem("cart",JSON.stringify([productId]))
    }
   
   }
 function closenoti(){
        settxt(" ");
        setnotii(false)
 }
 function pagechange(d:number){
     message.skip = d;
     api()
 }
 async function sortprice(e:any){
  const sort = e.target.value;
  const sortprice = {sort,query:data,skip:sk}
  
  console.log(e.target.value,"thhis is sorft")
  await fetch(`${process.env.NEXT_PUBLIC_APIURL}/sortprice`,
    {method:"POST",headers:{'Content-Type':'application/json'},body:JSON.stringify({data:sortprice})}
  ).then(async(d)=>{
    const dd = await d.json();
    console.log(dd)
    setda(dd.result);
  })
 }
  return (
    
    <div className={styles.parent}>
   
       <Nav value={0}/>
      <div className={styles.filter}>
      <div className={styles.sortprice}>
  <label >Sort by :</label>
  <select onChange={(e)=>sortprice(e)} className={styles.select}>
  <option value="" disabled>Select Price</option>
    <option value="low">Low To High</option>
    <option value="high">Hight To Low</option>
  
 
  </select>
 
  
    </div>
      </div>
       {notii &&  <Noti text={txt} onClose={closenoti}/>}
       {l&& <Loading/>}
       <div className={styles.con}>
        {da&& da.length>0 && da.map((item)=>(
            <div key={item._id} className={styles.card}>
             <img className={styles.img} src={`/images/${item.imagesname[0]}`}></img>
            <div className={styles.textcon}>
             <FavoriteBorderIcon className={styles.love}/>
              <p>{item.info.brand}</p>
              {item.info.discount ? (<p>{Math.round(parseFloat(item.info.price)/100* (100 - parseFloat(item.info.discount)))} ks  <span>{item.info.price} ks</span></p>):
              (<p>{item.info.price}ks</p>)} 
              <p>{item.info.stocks} stocks avilable</p>  
              <div className={styles.butcon}>
              <Link style={{ textDecoration: "none", color: "inherit" }} key = {item._id} href={`../product/${encodeURIComponent(item._id)}`}></Link>
              <p  onClick={()=> Buy(item._id)} className={styles.buy}>Buy</p>
              
              <p onClick={()=>addtocart(item._id)} className={styles.cart}>Add Cart</p>
              </div> 
            </div>
            </div>
        ))}
        {empty && <h1>No data for this search..</h1>}
       </div>
      {len>0 &&  <Pagi value={len} onpagechange={pagechange}/>}
     
    </div>
  )
}
