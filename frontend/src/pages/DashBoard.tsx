import { MetricsCard } from '@/newComponent/MetricCard'
import axios from 'axios'

import type { Product } from './AllProducts'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

const DashBoard = () => {
    const [number,setNumber]=useState(0)
    const {isPending}=useQuery({
        queryKey:["productCount"],
        queryFn:async()=>{
           const response= await axios.get("http://localhost:4000/count")
           console.log(response.data)
           setNumber(response.data.info)
           return response.data
        },
    })

    
    if(isPending)return <>Loading..</>
  return (
    <div className=''>
        <MetricsCard heading='No of Low Quantity product' value={number}/>
    </div>
  )
}

export default DashBoard