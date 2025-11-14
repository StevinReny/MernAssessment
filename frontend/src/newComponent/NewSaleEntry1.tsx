import React, { useState } from 'react'
import Navbar from './Navbar'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import type { Product } from '@/pages/AllProducts'

const NewSaleEntry1 = () => {

    const [data,setData]=useState()
    const [quantity,setQuantity]=useState(0)

    const {data,isPending}=useQuery({
        queryKey:["allProducts"],
        queryFn:async()=>{
            const response=await axios.get("http://localhost:4000/product/")
            console.log(response.data)
            return response.data
        }
    })

    if(isPending) return <>Loading...</>
  return (
    <div>
        {!open && <Navbar/>}
        <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-cyan-50 p-4">
             
      <div className=" flex flex-col gap-2 ">
        <div>Available Products</div>
        <div className='flex flex-row gap-3'>
        {data.info.map((item:Product)=>{
            return (
                <div className='max-w-lg bg-gray-200 p-4 rounded-2xl hover:scale-110 flex flex-col gap-3'>
                <div className=''>
                    <div>Name:{item.name}</div>
                    <div>Price: {item.price}</div>
                    <div>CurrentStock :{item.currentStock}</div>
                </div>
                <div className='flex gap-2'>                   
                    
                </div>
                </div>
            )
        })}
        </div>
        <div className=" flex flex-col ">
         <form  className="space-y-6">
            <div className="group">
              <label
                htmlFor="Quantity"
                className="block text-sm font-semibold text-gray-700 mb-3"
              >
                Quantity
              </label>
              <div className="relative">
                <input
                  id="name"
                  type="text"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-full px-4 py-4 bg-white/60 backdrop-blur-sm border rounded-xl focus:ring-2 focus:ring-stone-600 focus:border-transparent focus:outline-0 transition-all duration-300"
                  placeholder="Book"
                />
              </div>
            </div>
            </form>

        </div>
    </div>

    </div>
    </div>
  )
}

export default NewSaleEntry1