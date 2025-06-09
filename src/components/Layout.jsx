import React from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import logo from '../assets/logo.png'
import Discount from './../pages/Discount';
import Sizes from './../pages/Sizes';
import Colors from './../pages/Colors';
import Faq from './../pages/Faq';
import Contact from './../pages/Contact';
import Team from './../pages/Team';
import News from './../pages/News';
import Products from './../pages/Products';


export default function Layout() {  
  const navigate = useNavigate()
  const logOut=()=>{
    localStorage.removeItem("token")
    navigate("/login")
  }
 
    return (
      <div className="flex min-h-screen justify-items-center-safe">

         <aside className="w-64 bg-[#2a354d] text-white p-4 items-center">
         
          <div className="mb-4 items-center w-[90px] mx-auto">
            <img src={logo} alt="logo" className='flex items-center' />
          </div> 

           
          <nav className="flex flex-col gap-2">
            <NavLink to="/products" className="hover:bg-gray-700 px-4 py-2 rounded text-center">Products</NavLink>
            <NavLink to="/category" className="hover:bg-gray-700 px-4 py-2 rounded text-center">Category</NavLink>
            <NavLink to="/discount" className="hover:bg-gray-700 px-4 py-2 rounded text-center">Discount</NavLink>
            <NavLink to="/sizes" className="hover:bg-gray-700 px-4 py-2 rounded text-center">Sizes</NavLink>
            <NavLink to="/colors" className="hover:bg-gray-700 px-4 py-2 rounded text-center">Colors</NavLink>
            <NavLink to="/faq" className="hover:bg-gray-700 px-4 py-2 rounded text-center">Faq</NavLink>
            <NavLink to="/contact" className="hover:bg-gray-700 px-4 py-2 rounded text-center">Contact</NavLink>
            <NavLink to="/team" className="hover:bg-gray-700 px-4 py-2 rounded text-center">Team</NavLink>
            <NavLink to="/news" className="hover:bg-gray-700 px-4 py-2 rounded text-center">News</NavLink>
          </nav>
        </aside>
 




        <div className="flex-1 flex flex-col">
          <header className="p-4 bg-white text-right shadow">
            <button className="bg-red-700 text-white px-4 py-2 rounded hover:bg-red-300 hover:text-black" onClick={logOut}>Log Out</button>
          </header>
          <main className="p-6">
            <Outlet />
          </main>
        </div>
      </div>
    );
  
}
