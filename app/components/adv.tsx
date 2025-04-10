'use client'
import styles from "./com.module.css";
import Link from "next/link"
import { useEffect,useState } from "react"
import Pagi from "../components/pagi";
import Loading from "./loading";
import Noti from "./noti"
export default function Adv (){

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
        profilepi:string;
      }
      let [l,setl] = useState(false)
    let [d,setd] = useState<Item[]>([]);
    let [count,setcount] = useState<number>(1);
    async  function a(num:number){
      setl(true)
    await  fetch(`${process.env.NEXT_PUBLIC_APIURL}/product`,{method:"POST",headers:{'Content-Type':'application/json'},body :JSON.stringify({num:num})}).then(async (resp)=>
      { 
        console.log(resp,"s")
        return await resp.json()

      }
    ).then(async (dd)=>{
     
      setd(dd.first15Items);
     setl(false)
      let c = dd.count;
      console.log(c,"count.........")
      setcount(c)
    

    })
      }
       
         useEffect(()=>{
         
          a(1)
          console.log(d,"this is d");
         },[])
     function handlepangi(d:number){
      a(d)
     }
    return(
        <div className={styles.con}>
       
        {l&&(<Loading/>)}
            <div className={styles.productCon}>

            {d && d.length > 0 ? (
          d.map((item:any, index) => (
            <Link style={{ textDecoration: "none", color: "inherit" }} key = {item._id} href={`../product/${encodeURIComponent(item._id)}`}>
         
            <div className={styles.card}>
                <img id = {item._id} className={styles.img} src={`images/${item.profilepic}`}></img>
            
           
            {item.info && item.info.discount ?(<>
               <div key={index} className={styles.priceconin}>
               <p className={styles.brandname}>{item.info.brand}</p>
               <div className={styles.pricerow}>
                <p>{Math.round(parseFloat(item.info.price)/100* (100 - parseFloat(item.info.discount)))} ks </p>
                <p className={styles.pricedelete}>{item.info.price} ks</p>
               
                </div>
                <p className={styles.avilable}>{item.info.stocks} stocks</p>
               </div>
               {Number(item?.info?.discount) > 0 && <p className={styles.discount}>{item.info.discount}% discount</p>}

               </>
            ):(
              <>
               <div key={index} className={styles.priceconin}>
               <p>{item.info.brand}</p>
               <div className={styles.pricerow}>
                <p>{item.info.price} ks </p>
               
               
                </div>
                <p className={styles.avilable}>{item.info.stocks} stocks</p>
               </div>
             
               </>
            )}
           
        </div>
      
        </Link>
          
          ))
        ) : (
          <Loading/>// Show a loading message while waiting for data
        )}
               
            </div>
            {d.length>0&& <Pagi value={count} onpagechange={handlepangi}/>}
        </div>
    )
}