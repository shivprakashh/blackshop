"use client"; // Ensure this is a client component

import { useRouter } from "next/navigation";
import style from "../product/product.module.css"
import styles from "./com.module.css";
import DehazeIcon from '@mui/icons-material/Dehaze';
import SearchIcon from '@mui/icons-material/Search';
import { useState ,useEffect,useRef} from "react";
import CloseIcon from '@mui/icons-material/Close';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import Link from "next/link";
import Category from "../product/com/category";
import Loading from "./loading"

interface NavProps {
    value: number;  // Define the type of the value prop
  }
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

export default function Nav({value}:NavProps){
    const inputRef = useRef<HTMLInputElement | null>(null);
   const [cartcheck,setcartcheck] = useState(false);
   const [data,setdata] = useState<Item[] | null>(null);
    const [show,setshow] = useState<boolean>(false);
   const [inputcheck,setinputcheck] = useState(false);
    const [len,setlen] = useState<number | null>(null);
  
   
    function aa(){
        let loca: string | null  = localStorage.getItem("cart");
    let local = loca ? JSON.parse(loca) :[];
    setlen(local.length)
     }
   useEffect(()=>{
  
    aa()
    window.addEventListener("storage", aa);
    return () => {
        window.removeEventListener("storage",aa);
      };
    
   },[aa])

    function menushow(){
        if(show){
            setshow(false)
            
        }
        else{
            setshow(true)
        }
    }
    function close(){
        setshow(false)
    }
   async function cartclick(){
       setcartcheck(true);
     

    }
    function closecart(){
        setcartcheck(false)
    }
    function handleinput(){
  setinputcheck(true)
    }
    function closesearch(){
        setinputcheck(false);
        setdata(null)
        
    }
   async function api(v:any){
    console.log(v,"dgdfdgdgdgd")
    const bodyData = JSON.stringify(v); 
    console.log(bodyData,"this is bodydata")
       await fetch(`${process.env.NEXT_PUBLIC_APIURL}/startwith`,{method:"POST",headers: { "Content-Type": "application/json" },body:bodyData}).then(async(d)=>{
           const dd = await d.json();
           console.log(dd.result)
           if(dd.result){
            setdata(dd.result)
           }
          
       })
    }
    function debounc<T extends (...args: any[]) => void>(fun: T, delay: number): (...args: Parameters<T>) => void {
        let timer: ReturnType<typeof setTimeout>;
        return function (...da){
            clearTimeout(timer);
           timer = setTimeout(()=>{fun(...da)},delay)
        }
    }
    let debounce = debounc(api,500);
    function handlechange(e: React.ChangeEvent<HTMLInputElement>){
        let data = e.target.value;
        let message = {data,check:false}
         
        debounce(message)
        console.log(data,"input value")
    }
    const router = useRouter();
    function find(){
     
        setinputcheck(false)
      setdata(null)
     let value = inputRef.current?.value;
     if(value){
     
        router.push(`/search?query=${encodeURIComponent(value)}`)
       
        
     }

    }
    function categ(d:string){
  
        setinputcheck(false)
         setdata(null)
     
     if(d){
     
        router.push(`/search/category?query=${encodeURIComponent(d)}`)
        }

    }
    return(
        <>
    
        <div className={show? styles.menushow : styles.menuhide}>
<CloseIcon onClick={close} className={styles.close}/>
        </div>
        <div className={value == 1 ? styles.navhave:styles.nav}>
            
            <h3 className={styles.logo} >Black shop</h3>
           <div className={styles.navleftcon}>
           <div className={inputcheck ? styles.inputconclick : styles.inputcon}>
                 <CloseIcon onClick={closesearch} sx={{ display: inputcheck ? 'block' : 'none' }}  className={styles.closesearch}/>
                 <div className={inputcheck? styles.inputinconclick : styles.inputincon}>
                 <input ref={inputRef} className={inputcheck ? styles.inputdisplay : styles.input} type = "text" onClick={handleinput} onChange={handlechange} placeholder="search" ></input>
                    <div onClick={find} className={styles.searchcon}>
                      <SearchIcon  className={styles.search} />
                     </div> 
                 </div>
             <div className={inputcheck ? styles.searchshowcon:styles.searchshowconNone}>
                  {data && data.map((d)=>(
                     <div key={d._id}>
                    <p>{d.info.brand}</p>
                     </div>
                    ))}
              </div>
             {inputcheck&&  <div className={styles.catshowcon}>
                <p style={{color:"grey",borderLeft:"3px solid red",padding:"2px 5px"}}>Categories..</p>
                <div className={style.catecon}>
                        
                       
                        <p onClick={()=>categ("Phone")} className={style.catBut}>Phone</p>
                        <p onClick={()=>categ("Phone")} className={style.catBut}>Gym</p>
                      
              </div>
              </div>}
           </div>
           <Link style={{ textDecoration: "none", color: "inherit" }}  href={`../cart`}>
           <div onClick={cartclick} className={styles.mallcon}>
           <LocalMallIcon  className={styles.cartstyle}/>
           {len&& (<p className={styles.malldetails}>{len}</p>)}
           </div>
           </Link>
           <DehazeIcon className = {styles.menu} onClick={menushow}/>
        
           </div>
          
        </div>
        </>
    )
}