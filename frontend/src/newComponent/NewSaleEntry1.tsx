import  { useState } from 'react'

import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
// import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
// import { Input } from '@/components/ui/input'
// import { Label } from '@radix-ui/react-label'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import type { Product } from '@/pages/AllProducts'

import { toast } from 'react-toastify'
import { Label } from '@/components/ui/label'
import { useNavigate } from 'react-router-dom'
// import { Divide } from 'lucide-react'
// import type { Product } from '@/pages/AllProducts'

const NewSaleEntry1 = () => {
    const navigate=useNavigate()

    const [data1,setData]=useState([{}])
    const [date,setDate]=useState('')
    const [quantity,setQuantity]=useState(0)
    const [product,setProduct]=useState<Product|null>(null)
    const [open,setOpen]=useState(false)
    const {data,isPending}=useQuery({
        queryKey:["allProducts"],
        queryFn:async()=>{
            const response=await axios.get("http://localhost:4000/product/")
            console.log(response.data)
            return response.data
        }
    })
    const handleCheck=()=>{
        if(quantity==0 || !product){
            toast.error("Nothing is selected or quantity is 0")
            return
        }
        else if (quantity>Number(product.currentStock)){
            toast.error(`Quantity must be less than ${product.currentStock}`)
            return 
        }
        else{
            setData((prev) => [
        ...prev,
        {
            quantity: quantity,
            product_id: product.id, 
        },
    ]);
    product.currentStock=String(Number(product.currentStock)-quantity)
    console.log(data1)
    setQuantity(0)
    setProduct(null)
    setOpen(false)
        }


    }

    const handleSubmit=async()=>{
        try {

        if(date==="" || !data1){
            toast.error("Sale Date and Items cannot be empty")
            return 

        }
        console.log(data1)
        const response=await axios.post("http://localhost:4000/product/sale",{saleDate:date,data:data1})
        console.log(response.data)
        toast.success(`Bill generated Your Id is ${response.data.info.id}`)
        navigate(`/allBill`)

        } catch (error) {
            console.log(error)
        }
        finally{
            setData([{}])
            setDate("")
        }
    }
    

    if(isPending) return <>Loading...</>

  return (
    <div>
    <div>
    <Label>Sale Date</Label>
    <input type="date"  value={date} onChange={(e)=>setDate(e.target.value)}/>
    </div>
    <div className='flex gap-5'>
   <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Add Sale</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 " align="center">
        <DropdownMenuLabel>Avaliable Products</DropdownMenuLabel>
         {data.info.map((item:Product)=>{
            return (
                <div key={item.id} >
                    <DropdownMenuItem onClick={()=>{setProduct(item);
                        setOpen(true)}}>{item.name}</DropdownMenuItem>
                </div>
            )
         })}
         
          
      </DropdownMenuContent>
    </DropdownMenu>
    <div>
    {open && <div>
        <div>Quantity</div>
        <input type="number" value={quantity} onChange={(e)=>setQuantity(Number(e.target.value))} />
        <Button onClick={handleCheck}>Insert</Button>
            
            </div>}
    </div>
    <Button onClick={handleSubmit}>Generate Bill</Button>
    </div>
    </div>
  
  )
}



export default NewSaleEntry1