 import React, { useEffect } from 'react'
import Layout from './components/Layout'
import { useNavigate } from 'react-router-dom';
import Login from './pages/login/Login';
 
 export default function App() {
   const token = localStorage.getItem("token");
   
   
   const navigate=useNavigate()
   useEffect(()=>{
    if(!token){
      navigate("/login")
    }

   },[token])
   return token? <Layout/>:<Login/>
 }
 