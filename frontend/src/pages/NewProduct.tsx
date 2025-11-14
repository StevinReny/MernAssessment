// import Navbar from '@/newComponent/Navbar'
import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const NewProduct = () => {
    const[name,setName]=useState("")
    const[price,setPrice]=useState(0)
    const[taxPercentage,setTaxPercentage]=useState(0)
    const[currentStock,setCurrentStock]=useState(0)

    const navigate=useNavigate()
    const handleSubmit=async(e:React.FormEvent)=>{
        e.preventDefault()
        try {
            const response=await axios.post("http://localhost:4000/product/add",{name,price,taxPercentage,currentStock})
            toast.success("Successfully inserted")
            console.log(response)

        } catch (error) {
            toast.error("Something went wrong")
            console.log(error)
        }
        finally{
            setCurrentStock(0)
            setPrice(0)
            setName("")
            setTaxPercentage(0)
        }
    }
  return (
     <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-cyan-50 flex items-center justify-center p-4">
      
      <div className="w-full max-w-3xl flex flex-col ">
         <form onSubmit={handleSubmit} className="space-y-6">
            <div className="group">
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-gray-700 mb-3"
              >
                Name
              </label>
              <div className="relative">
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-4 bg-white/60 backdrop-blur-sm border rounded-xl focus:ring-2 focus:ring-stone-600 focus:border-transparent focus:outline-0 transition-all duration-300"
                  placeholder="Book"
                />
              </div>
            </div>

            <div className="group">
              <label
                htmlFor="price"
                className="block text-sm font-semibold text-gray-700 mb-3"
              >
                Price
              </label>
              <div className="relative">
                <input
                  id="text"
                  type="text"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="w-full px-4 py-4 bg-white/60 backdrop-blur-sm border rounded-xl focus:ring-2 focus:ring-stone-600 focus:border-transparent focus:outline-0 transition-all duration-300"
                  placeholder="Enter your password"
                />

              </div>
            </div>
            <div className="group">
              <label
                htmlFor="currentStock"
                className="block text-sm font-semibold text-gray-700 mb-3"
              >
           Stock
              </label>
              <div className="relative">
                <input
                  id="currentStock"
                  type="text"
                  value={currentStock}
                  onChange={(e) => setCurrentStock(Number(e.target.value))}
                  className="w-full px-4 py-4 bg-white/60 backdrop-blur-sm border rounded-xl focus:ring-2 focus:ring-stone-600 focus:border-transparent focus:outline-0 transition-all duration-300"
                  placeholder="Enter your current stock"
                />

              </div>
            </div>
<div className="group">
              <label
                htmlFor="taxPercentage"
                className="block text-sm font-semibold text-gray-700 mb-3"
              >
                TaxPercentage
              </label>
              <div className="relative">
                <input
                  id="text"
                  type="text"
                  value={taxPercentage}
                  onChange={(e) => setTaxPercentage(Number(e.target.value))}
                  className="w-full px-4 py-4 bg-white/60 backdrop-blur-sm border rounded-xl focus:ring-2 focus:ring-stone-600 focus:border-transparent focus:outline-0 transition-all duration-300"
                  placeholder="Enter your tax percentage"
                />

              </div>
            </div>

            <button
              type="submit"
              className="w-full group relative bg-zinc-900 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 disabled:hover:scale-100 border border-stone-600/20 overflow-hidden cursor-pointer"
            >
              Insert
            </button>
          </form>
            <button onClick={()=>navigate("/all") }  className="w-full group relative bg-zinc-900 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 disabled:hover:scale-100 border border-stone-600/20 overflow-hidden cursor-pointer">Close</button>
    </div>
    </div>
  )
}

export default NewProduct