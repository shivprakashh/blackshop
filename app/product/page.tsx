'use client'
import Image from "next/image";
import styles from "./product.module.css";
import Nav from "../components/nav";
import Adv from "../components/adv";


import { useState, useEffect } from "react";

export default function ome() {
  const [scrollY, setScrollY] = useState(0);
  const [scrolled, setScrolled] = useState(0);
  const [check,setcheck] = useState(false);
  const handleScroll = () => {
    
    if(window.scrollY>10){
      setScrolled(1)
    }
    else{
      setScrolled(0)
    }
    // Add class when scrolled beyond 100px
  };

  useEffect(() => {
  
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  return (<>
  <div className={check ? styles.on:styles.off}></div>
      <Nav value = {scrolled}/>
   
    <Adv/>
   </>
  );
}
