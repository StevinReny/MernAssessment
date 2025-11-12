import { queryClient } from '@/main'
import axios from 'axios'
import  { useState } from 'react'
import { toast } from 'react-toastify'

export const NewEntryStock = ({product_id,onClose}:{product_id:string,onClose:()=>void}) => {
    const [quantity,setQuantity]=useState(0)
    const[purchasePrice,setPurchasePrice]=useState(0)
    const[purchaseDate,setPurchaseDate]=useState("")
    
    const handleSubmit=async(e:React.FormEvent)=>{
        e.preventDefault()
        try{
            const response=await axios.post("http://localhost:4000/product/entry",{product_id,quantity,purchasePrice,purchaseDate})
            console.log(response)
            toast.success("Successfully insserted")
            queryClient.invalidateQueries({queryKey:['allProducts']})
        }
        catch(error){
            toast.error("Some error occur")
            console.log(error)
        }
        finally{
            setPurchaseDate("")
            setPurchasePrice(0)
            setQuantity(0)
            onClose()
            
        }
    }
    return (
  <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-cyan-50 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl flex flex-col ">
         <form onSubmit={handleSubmit} className="space-y-6">
            <div className="group">
              <label
                htmlFor="Quantity"
                className="block text-sm font-semibold text-gray-700 mb-3"
              >
                Quantity
              </label>
              <div className="relative">
                <input
                  id="quantity"
                  type="text"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-full px-4 py-4 bg-white/60 backdrop-blur-sm border rounded-xl focus:ring-2 focus:ring-stone-600 focus:border-transparent focus:outline-0 transition-all duration-300"
                  placeholder="0"
                />
              </div>
            </div>

            <div className="group">
              <label
                htmlFor="price"
                className="block text-sm font-semibold text-gray-700 mb-3"
              >
                Purchase Price
              </label>
              <div className="relative">
                <input
                  id="price"
                  type="text"
                  value={purchasePrice}
                  onChange={(e) => setPurchasePrice(Number(e.target.value))}
                  className="w-full px-4 py-4 bg-white/60 backdrop-blur-sm border rounded-xl focus:ring-2 focus:ring-stone-600 focus:border-transparent focus:outline-0 transition-all duration-300"
                  placeholder="0"
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
                  id="purchaseDate"
                  type="date"
                  value={purchaseDate}
                  onChange={(e) => setPurchaseDate(e.target.value)}
                  className="w-full px-4 py-4 bg-white/60 backdrop-blur-sm border rounded-xl focus:ring-2 focus:ring-stone-600 focus:border-transparent focus:outline-0 transition-all duration-300"
                  placeholder="Enter your current stock"
                />

              </div>
            </div>
            <div className='flex gap-2'>
            <button
              type="submit"
              className="w-md group relative bg-zinc-900 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 disabled:hover:scale-100 border border-stone-600/20 overflow-hidden cursor-pointer"
            >
              Insert
            </button>
            <button
              onClick={onClose}
              className="w-md group relative bg-zinc-900 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 disabled:hover:scale-100 border border-stone-600/20 overflow-hidden cursor-pointer"
            >
              Close
            </button>
            </div>
          </form>
    </div>
    </div>
  )
}

export default NewEntryStock