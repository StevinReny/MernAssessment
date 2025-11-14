import { MetricsCard } from '@/newComponent/MetricCard'
import axios from 'axios'

import type { Product } from './AllProducts'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

const DashBoard = () => {
    const [number,setNumber]=useState(0)
    const {isPending}=useQuery({
        queryKey:["allProductss"],
        queryFn:async()=>{
           const response= await axios.get("http://localhost:4000/product/")
           console.log(response.data)
           const result = response.data.info.filter((item: Product) => Number(item.currentStock) > 6);   
           console.log(result)
        setNumber(result.length())
           return response.data
        },
    })

    
    if(isPending)return <>Loading..</>
  return (
    <div>
        <MetricsCard heading='No of Low Quantity product' value={number}/>
    </div>
  )
}

export default DashBoard