'use client'
import styles from "./success.module.css";
import {useRef,useState,useEffect} from "react";
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Nav from "../components/nav"
import { Lobster} from 'next/font/google'
  import { useSearchParams } from "next/navigation";
  
const roboto = Lobster({
  weight: '400',
  subsets: ['Latin'],
})
export default function Successful() {
  const searchParams = useSearchParams();
  const orderid = searchParams.get("query");
    const [dataa,setdataa] = useState(null)
    async function api (orderid){
        const resp =   await fetch(`${process.env.NEXT_PUBLIC_APIURL}/orderget`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({orderid})})
        const data = await resp.json();
        setdataa([data.purchases])
        console.log(data.purchases,"this is data getting thaks")
    }
    useEffect(()=>{
    
       api(orderid)
    },[0])
   
    return(
        <>
        <Nav></Nav>
       <div className={styles.con}>
        {dataa && 
        <>
          <CheckCircleIcon sx={{ fontSize: 80 }} color="success"/>
          <h1  className={roboto.className}>Hello {dataa[0].user.name} ,</h1>
       <h3  className={roboto.className}>Thanks you for shopping with us</h3>
       <p>We are gonna delivar the products to the address {dataa[0].user.address}... </p>
       <div className={styles.items}>
       <div  className={styles.itemsrow}>
                <div className={styles.datacon}>
                   
                </div>
                <div className={styles.datacon}>
                  
                </div>
                <div className={styles.datacon}>
                    <p>QUANTITY</p>
                   
                </div>
                <div className={styles.datacon}>
                    <p>Total</p>
                  
                </div>
              
            </div>
      {
        dataa[0].products.map((itt,index)=>(
           
      
            <div key={index} className={styles.itemsrow}>
                <div className={styles.datacon}>
                    <img className={styles.img} src={`images/${itt.profilepic}`}></img>
                </div>
                <div className={styles.datacon}>
                    <p>{itt.product.brand}</p>
                    <p>{itt.product.finalprice}ks <span>{itt.product.price}ks</span></p>
                    <p>Discount : {itt.product.discount}</p>
                </div>
                <div className={styles.datacon}>
                  
                    <p>{itt.quantity}</p>
                </div>
                <div className={styles.datacon}>
                   
                    <p>{itt.quantity}</p>
                </div>
              
            </div>
         
        ))
      }
        </div>
       <div className={styles.bottom}>
        <div className={styles.totalcon}>
        <table className={styles.table}>
  <thead>
    <tr className={styles.tr}>
      <th className={styles.th}>TOTAL PRICE</th>
      <th className={styles.th}>Status</th>
    </tr>
  </thead>
  <tbody>
    <tr className={styles.tr}>
      <td className={styles.price}>{dataa[0].totalprice} ks</td>
      <td className={styles.status}>{dataa[0].status}</td>
    </tr>
  </tbody>
</table>

        </div>
       </div>
        </>
        
        }
       </div>
       </>
    )
}