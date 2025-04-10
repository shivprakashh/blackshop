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
import Suggest from "./suggest";

export default function Single(){
  interface Item {
    _id: string;
    detail:string[];
    imagesname: string[];  // An array of image names
  }
  interface Info {
    brand: string;
    price:string;
    discount: string;  // An array of image names
    stocks:string;
  }
 

  const [imgid,setimgid] = useState<number | null >(null)
  const params = useParams() as {id:string}; // ✅ Get ID from URL
  const [d,setd] = useState<Item[]>([])
  const [images,setimages] = useState<Item[]>([]);
  const [info,setinfo] = useState<Info | null>(null)
  const productId = params.id;
  const [noti,setnoti] = useState(false);
  const [txt,settxt] = useState("Wellcome!");
  const [catesuggest,setcatesuggest] = useState<any>(null)
  const [subsuggest,setsubsuggest] = useState<any>(null)

 

    console.log(productId)
    const [pop,setpop] = useState(false)
  
    async function sug(data:any,type:any){
      const resp =   await fetch(`${process.env.NEXT_PUBLIC_APIURL}/suggestget`,{method:"POST",headers:{'Content-Type':'application/json'},
        body:JSON.stringify({data:data,type:type})})
     if(resp.ok){
      const data = await resp.json();
      if(type === "cate"){
         setcatesuggest(data.result)
      }else{
        setsubsuggest(data.result)
      }
      console.log(data);
     }else{
      alert("error in suggest get")
     }
     }
    useEffect(()=>{
      async  function a(){
       
     await   fetch(`${process.env.NEXT_PUBLIC_APIURL}/single`,{method:"POST",headers: { "Content-Type": "application/json" },body :JSON.stringify({productId})}).then(async (resp)=> resp.json()
      ).then((dd)=>{
        console.log(dd);
        const da = dd.detail;
        const im = dd.imagesname;
        const inf = dd.info;
        setd(da);
        setimages(im)
        setinfo(inf)
        sug(dd.info.category,'cate');
        sug(dd.info.subcategory,'subcate')
        

      })
        }
        a()
       },[productId])

    function buy(){
  if(pop){
    setpop(false)
  }else{
    setpop(true)
  }
    }
   
    function popend(){
      if(pop){
        setpop(false)
      }else{
        setpop(true)
      }
    }

    function hover(i:number){
    
      setimgid(i)
    }

    function addtocart(){
     let local = localStorage.getItem("cart");
     if(local){
      let data = JSON.parse(local)
         if(data.length < 10){
            if(data.includes(productId)){
              setnoti(true)
              settxt("Already in the cart")
              
            }else{
              data.push(productId);
              localStorage.setItem("cart",JSON.stringify(data))
              setnoti(true)
              settxt("Successfully added to the cart")
            }
         }else{
          setnoti(true)
          settxt("Only 10 products you can buy at once")
          alert("only 10 products you can buy at once")
         }
     }else{
      localStorage.setItem("cart",JSON.stringify([productId]))
      setnoti(true)
      settxt("Successfully added to the cart.")
     }
    
    }
    function handlepop(d:number){
 if(d === 0){
  setpop(false)
 }
    }
    return(
        <>    
        <Nav  value={0}/>
       {noti && <Noti  text={txt} onClose={()=>settxt(" ")}/>}
  <div className={styles.con}>
  <div className={pop ? styles.popuphave:styles.popup}>
    <Buy datavalue={[{productId:productId,quantity:1}]} handlepop={handlepop} />
  </div>
            <div className={styles.singleleft}>
              
              
                {images && images.length > 0 ? (
                  <div className={styles.leftimgcon}>
                  <div className={styles.arrofimage}>
                    {images.map((a,index)=>(
            <img  key={index} onClick={()=> hover(index)} className={styles.arrimg} src={`/images/${a}` }></img>
                    ))}
                  </div>
                  <div className={styles.oneimgcon}>
                  <img className={styles.rightimg} src={imgid ?`/images/${images[imgid]}` :`/images/${images[0]}` }></img>
          
                  </div>
                    
                 
              </div>
                ):(
          <Loading/>
                )}
           <div className={styles.butcon}>
           <button className={styles.buy} onClick={buy}>Buy Now</button>
          
           <button onClick={addtocart} className={styles.cartbut} >Add to cart</button>
           </div>
            </div>

            <div className={styles.singleright}>
              
                <div className={styles.rightCon}>
                {info && (
                  <>
                   <div  key={info.brand} className={styles.car}>
                <p className={styles.name}>Brand Name</p>
                <p   className={styles.value}>{info.brand}</p>
                   </div>
                   {info.discount? (
                      <>
                       <div  key={info.price} className={styles.car}>
                <p className={styles.name}>Price</p>
                <p  className={styles.value}>
                {Math.round(parseFloat(info.price)/100* (100 - parseFloat(info.discount)))} ks 
                <span className={styles.delete}>{info.price} ks</span>
                </p>
                   </div>
                   <div  key={info.discount} className={styles.car}>
                <p className={styles.name}>Discount</p>
                <p  className={styles.value}>{info.discount} % discount</p>
                   </div>
                      </>
                    ):(
                      <>
                       <div  key={info.price} className={styles.car}>
                <p className={styles.name}>Price</p>
                <p  className={styles.value}>{info.price}</p>
                   </div>
                   
                      </>
                    )}
                  
                   <div  key={info.stocks} className={styles.car}>
                <p className={styles.name}>Stocks avilable</p>
                <p  className={styles.value}>{info.stocks} pics avaiable..</p>
                   </div>
                   </>
                )}  
                <div className={style.detailborder}>
                {d && d.length > 0 ? (
 d.map((item, index) => (
  <div key={index} className={styles.car}>
    {Object.entries(item).map(([key, value]) => (
      key !== "_id" ? ( // Skip rendering if the key is '_id'
        key === "name" ? (
          <p key={key} className={styles.name}>{value}</p>
        ) : (
          <p key={key} className={styles.value}>{value}</p>
        )
      ) : null
    ))}
  </div>
))
  
) : (
  <h1></h1> // Show a loading message while waiting for data
)}</div>
<div style={{display:"flex",flexDirection:"row",gap:'10px'}}>
<LocalShippingIcon /><p style={{cursor:"pointer",textDecoration:"underline"}}>Delivery details..</p>
</div>
                </div>
            </div>
           
      
        </div>

  {subsuggest&& subsuggest.length>0?(
      <Suggest catesuggest={subsuggest}/>
    ):(
      <Loading/>
    )
    
    }
   
    {catesuggest&& catesuggest.length>0?(
      <Suggest catesuggest={catesuggest}/>
    ):(
      <Loading/>
    )
    
    }
    
       
        </>

    )
}



