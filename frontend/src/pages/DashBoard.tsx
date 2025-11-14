import { MetricsCard } from '@/newComponent/MetricCard'
import axios from 'axios'
import React from 'react'
import type { Product } from './AllProducts'
import { useQuery } from '@tanstack/react-query'

const DashBoard = () => {

    const {data,isPending}=useQuery({
        queryKey:["countProduct"],
        queryFn:async()=>{
           const response= await axios.get("http://localhost:4000/product/")
           return response.data
        },
    })
    const number=data.info.filter((item:Product)=>{
        if(Number(item.currentStock)<10){
            return item
        }
    })
    if(isPending)return <>Loading..</>
  return (
    <div>
        <MetricsCard heading='No of Low Quantity product' value={number}/>
    </div>
  )
}

export default DashBoard