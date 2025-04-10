import { useEffect,useState } from "react";
import styles from "./noti.module.css"
interface NotiProps {
    text: string;
    onClose: () => void; // Callback to reset text in parent
  }
export default function Noti({ text, onClose }: NotiProps){
    const [check,setcheck] = useState(false)
    useEffect(()=>{
      if(text ===" "){
setcheck(false)
      }
      else{
        setcheck(true)
        setTimeout(() => {
          setcheck(false)
          onClose()
        }, 4000);
      }
    },[onClose])
    return(
        <div className={ check? styles.con:styles.connone}>
        <p>{text}</p>
        </div>
    )
}