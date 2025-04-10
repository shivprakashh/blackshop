'use client';
import { useState, useRef } from "react";
import styles from "../admin.module.css";



export default function Delete(){
    
const idRef = useRef<HTMLInputElement | null>(null);

async function delet(){
    let id = idRef.current?.value;
    await fetch("/api/delete",{method:"POST",body:JSON.stringify(id)}).then(async(d)=>{
        const dd = await d.json();
        console.log(dd,"this is api response")
    })
}
    return(
        <div className={styles.right}>
            <div className={styles.deletecon}>
        <input ref={idRef} className={styles.deleteinput} type="text" placeholder="poduct id"></input>
        <button className={styles.deleteBut} onClick={delet}>Delete</button>
        <h3 >Or</h3>
        <button className={styles.deleteBut}>Delete All </button>
        </div>
        </div>

    )
}