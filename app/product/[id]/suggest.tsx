'use client'
import styles from "../product.module.css";
import { useParams } from "next/navigation";
import { useEffect, useState ,useRef } from "react";
import Nav from "../../components/nav";
import Loading from "../../components/loading"
import Buy from "../buy";
import Noti from "../../components/noti";
import style from "./single.module.css";
import com from "../../components/com.module.css";
import Link from "next/link";
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

export default function Suggest(catesuggest:any){
    
    console.log(catesuggest.catesuggest,"in suggest")
    return(
        <>
         <div className={style.suggest}>
          <div className={style.top}>
          <p className={style.title}>Suggestion products</p>
            <div className={style.top}>
            <p>View All</p>
            <KeyboardDoubleArrowRightIcon  style={{color:"red"}}/>
            </div>
          </div>

          <div className={style.suggestrow}>
          {catesuggest && 
          catesuggest.catesuggest.map((item:any, index:any) => (
            <Link style={{ textDecoration: "none", color: "inherit" }} key = {item._id} href={`../product/${encodeURIComponent(item._id)}`}>
         
            <div className={com.card}>
                <img id = {item._id} className={com.img} src={`/images/${item.profilepic}`}></img>
            
           
            {item.info && item.info.discount ?(<>
               <div key={index} className={com.priceconin}>
               <p className={com.brandname}>{item.info.brand}</p>
               <div className={com.pricerow}>
                <p>{Math.round(parseFloat(item.info.price)/100* (100 - parseFloat(item.info.discount)))} ks </p>
                <p className={com.pricedelete}>{item.info.price} ks</p>
               
                </div>
                <p className={com.avilable}>{item.info.stocks} stocks</p>
               </div>
               {Number(item?.info?.discount) > 0 && <p className={com.discount}>{item.info.discount}% discount</p>}

               </>
            ):(
              <>
               <div key={index} className={com.priceconin}>
               <p>{item.info.brand}</p>
               <div className={com.pricerow}>
                <p>{item.info.price} ks </p>
               
               
                </div>
                <p className={com.avilable}>{item.info.stocks} stocks</p>
               </div>
             
               </>
            )}
           
        </div>
      
        </Link>
          
          ))
       }
        
    
          </div>
          
        </div>
        </>
    )
}