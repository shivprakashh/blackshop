'use client'
import styles from "./product.module.css";
import {useRef,useState} from "react";
import { useRouter } from "next/navigation";
import CloseIcon from '@mui/icons-material/Close';
import Loading from "../components/loading";
type Po = {datavalue:any[]}
interface In{
    handlepop:(v:number)=>void;
}

export default function Buy({ datavalue, handlepop }: Po & In) {
   
     const [pop,setpop] = useState(false)
     const nameRef = useRef<HTMLInputElement | null>(null);
      const phoneRef = useRef<HTMLInputElement | null>(null);
      const addressRef = useRef<HTMLInputElement | null>(null);
      const[load,setload] = useState(false)
      const router =useRouter();

      async  function send(){
        setload(true);
        let arryofdata = [];
        const name = nameRef.current?.value;
        const phone = phoneRef.current?.value;
        const address = addressRef.current?.value;
        let userinfo = {name,phone,address};
        //array of data = [id:product id array,userinfo:{}]
        //id = [{productId,quantity},{productId,quantity}];
        //userinfo = {name,phone,address}
        arryofdata.push({userinfo,id:datavalue})
        await fetch("/api/savebuy",{method:"POST",body:JSON.stringify(arryofdata)}).then(async(d)=>{
          if(d.ok){
            handlepop(0)
            const data = await d.json()
            router.push(`/thanks?query=${encodeURIComponent(data.result)}`)
            setload(false)
          }
          else{
            alert("sorry cannot buy right now error")
            handlepop(0)
            setload(false)
          }
          
         
        })
    
  
      }
      function popend(){
handlepop(0)
      }
    return(
       
        <div className={styles.popupcon}>
         {load&& <Loading/>}
          <CloseIcon className={styles.cross} onClick={popend}/>
          <h4>Fill The Form,Our team will content You Soon</h4>
          <p>Cash On Delivery System</p>
          <input type="text" ref ={nameRef} placeholder="Name" className={styles.buyinput}></input>
          <input type="text" ref ={phoneRef} placeholder="Phone Number" className={styles.buyinput}></input>
          <input type="text" ref ={addressRef} placeholder="Full Address" className={styles.buyinput}></input>
          
          <button className={styles.realbuy} onClick={send}>Send</button>
        </div>
  
    )
}