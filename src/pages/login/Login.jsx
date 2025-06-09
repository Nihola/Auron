import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form'
import { data, useNavigate } from 'react-router-dom';

export default function Login() {
  const {register, handleSubmit, reset}=useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const LogIn=async (data)=>{
    setLoading(true);
    try{
      const response =await axios.post("https://testaoron.limsa.uz/api/auth/login",data)
      if(response?.data?.success){
        localStorage.setItem("token", response?.data?.data.access_token);
        toast.success('Muvaffaqiyatli kirildi');
        reset();

        navigate("/");
      }else{

      }
      // console.log(response);
      
    }catch(error){
      console.log(error);
      toast.error('Login failed');
    }finally{
      setLoading(false);
    }     
  }
   
  return (
    <div>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="w-full max-w-sm bg-white p-8 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>

          <form className="space-y-4">
            {/* Login Field */}
            <div>
              <input
                type="text"
                placeholder="Login"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register("login")}
              />
            </div>

            {/* Password Field */}
            <div>
              <input
              {...register("password")}
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full bg-blue-700 text-white py-2 rounded-md hover:bg-blue-200 transition hover:text-black"
                onClick={handleSubmit(LogIn)}
                disabled={loading}
              >

                {loading?"Logging in":"Log in"}
              </button>
            </div>
          </form>
        </div>
      </div>


    </div>
  )
}
