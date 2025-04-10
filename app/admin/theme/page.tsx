'use client';
import { useState, useRef } from "react";
import styles from "../admin.module.css";
import style from "../components/com.module.css";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DarkModeIcon from '@mui/icons-material/DarkMode';

export default function Theme(){
    return(
        <div className={styles.right}>
        <h1>hi from theme page</h1>
        </div>
    )
}