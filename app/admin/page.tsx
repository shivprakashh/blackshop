'use client';
import { useState, useRef,ReactNode } from "react";
import styles from "./admin.module.css";
import style from "../components/com.module.css";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import Delete from "./delete/page";
import Theme from "./theme/page";
import Edit from "./edit/edit";

 import Noti from "../components/noti"
import Buy from "./buy/page";
import EditIcon from '@mui/icons-material/Edit';
import { kMaxLength } from "buffer";

interface Data {
  name: string;
  value: string;
}
interface Info{
  brand:string;
  price:string;
  discount:string;
  stocks:string;
  category:string;
  subcategory:string;

}

export default function Admin() {
  const [noti,setnoti] = useState(false);
  const [txt,settxt] = useState("");
  const nameRef = useRef<HTMLInputElement | null>(null);
  const valueRef = useRef<HTMLTextAreaElement | null>(null);
  const imageRef = useRef<HTMLInputElement | null>(null);
  const profileRef = useRef<HTMLInputElement | null>(null);
  // Use useState to manage the array of values
  const brandRef = useRef<HTMLInputElement | null>(null);
  const categoryRef = useRef<HTMLInputElement | null>(null);
  const priceRef = useRef<HTMLInputElement | null>(null);
  const discountRef = useRef<HTMLInputElement | null>(null);
  const stocksRef = useRef<HTMLInputElement | null>(null);
  const subcategoryRef = useRef<HTMLInputElement | null>(null);
  const [arryofvalue, setArroOfValue] = useState<Data[]>([]);
  const [display,setdisplay] = useState<ReactNode | null >(null)
  const [add,setadd ] = useState(true)
  const[info,setinfo] =useState<Info>({brand:"",price:"",discount:"",stocks:"",category:"",subcategory:""});

  function handleAdd() {
    const nameValue = nameRef.current?.value || "";
    const textValue = valueRef.current?.value || "";

    console.log(nameValue, textValue, "value");

    // Add new item to the array using setState
    setArroOfValue((prevData) => [...prevData, { name: nameValue, value: textValue }]);
  }

  async function uploadAll() {
   
    const files = imageRef.current?.files;
    const profile :any = profileRef.current?.files;
    let form = new FormData();
    form.append("info",JSON.stringify(info))
    form.append("detail", JSON.stringify(arryofvalue)); // Attach the detail data as a JSON string
    if (files) {
      for (let item of files) {
      
        form.append("images", item); 
      }
    }
    if(profile){
      form.append("profile",profile[0])
    }
    //so iin the form data.... {info,detail,profile}
    // Send the data to the backend API
    await fetch("/api/admin", {
      method: "POST",
    
      body: form,
    })
      .then((resp) =>{
      
        if(resp.ok){
          setnoti(true);
          settxt("successfully save in the database")
         return resp.json()
        }else{
          setnoti(true);
          settxt("error saving in")
        }

      } )
      .then((d) => {
      
     
        console.log(d); // Log the response from the backend
      });
    for (let [key, value] of form.entries()) {
      console.log(`${key}:`, value);
    }

  
  }
  function ete(d:string){
    console.log("entering into delete")
  
    if(d === "delete"){
      setadd(false)
      setdisplay(<Delete/>)
    }
    if(d === "theme"){
      setadd(false)
      setdisplay(<Theme/>)
    }
    if(d === "buy"){
      setadd(false)
      setdisplay(<Buy/>)
    }
    if(d === "addproduct"){
      setdisplay(null)
      setadd(true)
    }
    if(d=== "edit"){
      setdisplay(<Edit/>)
      setadd(false)
    }

  }

  function infoadd(){
    let brand = brandRef.current?.value || "";
    let price = priceRef.current?.value || "";
    let discount = discountRef.current?.value || "";
    let stocks = stocksRef.current?.value || "";
    let category = categoryRef.current?.value || "";
    let subcategory = subcategoryRef.current?.value || "";
    setinfo({brand,price,discount,stocks,category,subcategory})
   

  }

  return (
    <div className={style.con}>
      {noti && <Noti  text={txt} onClose={()=>settxt(" ")}/>}
      <div className={styles.row}>
        <div className={styles.col}>
        <div className={styles.editcon}>
               <DeleteForeverIcon fontSize="large" onClick={(()=>ete("delete"))} className={styles.iconbut}/>
               < LocalMallIcon fontSize="large" onClick={(()=>ete("buy"))} className={styles.iconbut}/>
               < AddCircleIcon fontSize="large" onClick={(()=>ete("addproduct"))} className={styles.iconbut}/>
               < DarkModeIcon fontSize="large" onClick={(()=>ete("theme"))} className={styles.iconbut}/>
               <EditIcon fontSize="large" onClick={(()=>ete("edit"))} className={styles.iconbut}/>
            </div>
          
        </div>
        {display && display}
        <div className={add? styles.right:styles.rightnone}>
       
          {arryofvalue.map((item, index) => (
            <div key={index} className={styles.listcon}>
              <p className={styles.name}>{item.name}</p>
              <p className={styles.value}>{item.value}</p>
            </div>
          ))}
           <div className={styles.left}>
            <div className={styles.info}>
           
           
  


        <input ref={brandRef} className={styles.infoinput} type="text" placeholder="Brand Name" />
    
        <input ref={priceRef} className={styles.infoinput} type="text" placeholder="Price" />
    



        <input ref={categoryRef} className={styles.infoinput} type="text" placeholder="Category" />
    
        <input ref={discountRef} className={styles.infoinput} type="text" placeholder="Discount" />
    



        <input ref={stocksRef} className={styles.infoinput} type="text" placeholder="Stocks" />
    
      <input ref={subcategoryRef} className={styles.infoinput} type="text" placeholder="sub category" />
     
       <input  name="images" ref={profileRef} type="file"/>

<button onClick={infoadd} className={styles.infobut}>Add</button>
            </div>
            <div className={styles.addmorecon}>
            <p className={styles.details}>Product details</p>
            <input
              ref={nameRef}
              className={styles.input}
              type="text"
              name="name"
              placeholder="name"
            />
            <textarea
              ref={valueRef}
              className={styles.textarea}
              placeholder="value"
              spellCheck={false}
              name="value"
            ></textarea>
            <button onClick={handleAdd} className={styles.addBut}>Add More</button>
            </div>
           </div>
          <input
            name="images"
            ref={imageRef}
            type="file"
            multiple
            className={styles.image}
          />
          <button onClick={uploadAll} className={styles.finalbut}>
            Upload all things
          </button>
          
        </div>
      </div>
    </div>
  );
}
