import { Button } from '@/components/ui/button'
import { queryClient } from '@/main'
import NewEntryStock from '@/newComponent/NewEntryStock'
import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

interface Product{
    createdAt:string
currentStock:string
id:string
name:string
price:string
sku:string
taxPercentage:string
}

const AllProducts = () => {
    const [product_id,setProductId]=useState("")
    const [open,setOpen]=useState(false)
    const {data,isPending}=useQuery({
        queryKey:["allProducts"],
        queryFn:async()=>{
            const response=await axios.get("http://localhost:4000/product/")
            console.log(response.data)
            return response.data
        }
    })

    const handleDelete=(id:string)=>{
        mutate(id)
    }

    const {mutate,isPending:isPending1}=useMutation({
        mutationFn:async(id:string)=>{
            const response=await axios.delete(`http://localhost:4000/product/${id}`)
            console.log(response.data)
            toast.success("Success fully deleted")
        },
        onSuccess:()=>queryClient.invalidateQueries({queryKey:["allProducts"]})
    })
    if(isPending) return <>Loading...</>
  return (
        <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-cyan-50 p-4">
             {open ? <NewEntryStock product_id={product_id} onClose={()=>setOpen(false)}/>:

      <div className=" flex flex-col gap-3 ">
        <div>Available Products</div>
        {data.info.map((item:Product)=>{
            return (
                <div className='max-w-lg bg-gray-200 p-4 rounded-2xl hover:scale-110 flex flex-col gap-3'>
                <div className=''>
                    <div>Name:{item.name}</div>
                    <div>Price: {item.price}</div>
                    <div>SKU: {item.sku}</div>
                    <div>Tax Percentage: {item.taxPercentage}</div>
                    <div>CurrentStock :{item.currentStock}</div>
                </div>
                <div className='flex gap-2'>
                    <Button>Edit</Button>
                    <Button onClick={()=>{handleDelete(item.id)}}>{isPending1?"Deleting":"Delete"}</Button>
                    <Button onClick={()=>{
                        setProductId(item.id)
                        setOpen(true)
                    }}>Add new Stock</Button>
                   
                </div>
                </div>
            )
        })}
        <div></div>
    </div>
}
    </div>
  )
}

export default AllProducts