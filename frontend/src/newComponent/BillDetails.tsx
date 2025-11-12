import { Button } from '@/components/ui/button'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'




export interface Products{
    id:string,
    name:string,
    sku:string,
    price:number,
    currentStock:number,
    taxPercentage:number,
    createdAt:number
}
export interface NewSaleEntry{
    quantity:number,
    salePrice:number,
    id:string, 
    product:Products
    
}
export interface BillItem{
    id:string,
    saleDate:string
    totalPrice:number,
    saleItems:NewSaleEntry[]

}
const BillDetails = ({billId,onClose}:{billId:string,onClose:()=>void}) => {
    const {data,isPending}=useQuery({
        queryKey:["billDetails",billId],
        queryFn:async()=>{
            const response=await axios.get(`http://localhost:4000/product/sale/${billId}`)
            console.log(response.data)
            return response.data
        }
    })
    if(isPending) return <>Loading..</>
  return (
   <div className='bg-neutral-200 rounded-2xl p-4 max-w-xl'>
    <div>Sale Date {data.info.saleDate}</div>
    <div>Total Price {data.price}</div>
    <div className=''>
    {data.info.saleItems.map((item:NewSaleEntry,i)=>{
        return(
            <div key={i} className='bg-white p-5 m-3 rounded-2xl'>
            <div>Product Name {item.product.name}</div>
            <div>Product Quantity {item.quantity}</div>
            <div>Product Price {item.salePrice}</div>
            </div>
        )
    })}
</div>
<Button onClick={onClose} className='mt-3'>Back</Button>
   </div>
  )
}

export default BillDetails