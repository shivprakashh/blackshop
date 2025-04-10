import styles from "./com.module.css"
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useState,useEffect } from "react";
import Loading from "./loading"
interface rops {
    value: number;  // Define the type of the value prop
    onpagechange:(d:number)=>void;
  }
export default function Pagi({value,onpagechange}:rops){
   const [data,setdata] = useState<number[]>([1]);
   const [total,settotal] = useState<any>(0);
   const [styleno,setstyleno] = useState<any>(0)
     console.log(value,"value.............");

     function cacul(){
      let arr = [];

      let acer = Math.ceil(value/15); //300 pices
      //  //i have make 2 variable i = 100 and b = 108 I++
      console.log("acer",acer);
      settotal(acer)
       if(acer > 8){
        for(let i = 1;i< 9;i++){
        
          arr.push(i)
        }
           setdata(arr)
       }else{
        console.log("entering into else",acer)
        for(let i = 1;i<acer+1;i++){
          arr.push(i)
        }
           setdata(arr)
       }
      
   }

  useEffect(()=>{
   
    if(value<1){
        console.log("entering into ",value)
        setdata([1])
    }else{

      cacul()
       
    }
  },[value])
  function caculate(value:number,index:number){
console.log(total,"this is total")
    let plus = value+8;
    let arr = [];
   if(index === 7){
     // total = 13 khu,plus ka 8+8=16
    if(total < plus){
      for(let i = value; i< plus ; i++){
        arr.push(i)
       if(i === total) break;
         }
    setdata(arr)
    setstyleno(0)
    }
   }
let car=[];
     if(index === 0 && value !== 1){
      let minus = value-8; // == if 32 last wil 16
      for(let i = minus+1; i< value+1 ; i++){
        car.push(i)
    
         }
    setdata(car)
    setstyleno(7)
     }

  }
  function handlepageclick(d:number,index:number){
    onpagechange(d)
    setstyleno(index)
    caculate(d,index)
    
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
    return(
        <div className={styles.pagiCon}> 
           <NavigateNextIcon className= {styles.prev}/>
           <div className={styles.pagiinsidecon}>
           {data&& data.map((v,index)=>(
            <p key={index}  onClick={()=> handlepageclick(v,index)} className={ styleno === index ? styles.pagiButhave : styles.pagiBut}>{v}</p>
           ))}
            </div>
            
            <NavigateNextIcon className= {styles.pagiNext}/>
           
              
            
        </div>
    )
}