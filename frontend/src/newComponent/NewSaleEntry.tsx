import { Button } from "@/components/ui/button"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useState } from "react"
import BillDetails from "./BillDetails"

export interface Bill{
    id:string,
    saleDate:string,
    totalPrice:null|number
}
const SeeAllBill = () => {
    const [billId,setBillId]=useState("")
    const [open,setOpen]=useState(false)
    const {data,isPending}=useQuery({
        queryKey:['allBill'],
        queryFn:async()=>{
            const response=await axios.get("http://localhost:4000/bill")
            console.log(response.data)
            return response.data
        }
    })

    if(isPending) return <>Loading ...</>
  return (
     <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-cyan-50 p-4">
        {open ? <BillDetails billId={billId} onClose={()=>setOpen(false)}/>:
        <div className=" flex flex-col gap-3 ">
        <div>Available Bill</div>
        {data.info.map((item:Bill)=>{
            return (
                <div className='max-w-lg bg-gray-200 p-4 rounded-2xl hover:scale-110 flex flex-col gap-3'>
                <div className=''>
                    <div>Bill Id:{item.id}</div>
                    <div>Bill Date:{item.saleDate.split("T")[0]}</div>
                </div>
                <div className='flex gap-2'>
                    
                    <Button onClick={()=>{
                        setBillId(item.id)
                        setOpen(true)
                    }}>View detail</Button>
                   
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

export default SeeAllBill