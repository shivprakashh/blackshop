import { useEffect,useState } from "react";
import styles from "./noti.module.css"
interface NotiProps {
    text: string;
    onClose: () => void; // Callback to reset text in parent
  }
export default function Noti(){
    const [check,setcheck] = useState(false)
   
    return(
        <div className={styles.con}>
        
        </div>
    )
}