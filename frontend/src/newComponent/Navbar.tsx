import { useState } from "react"
import { useNavigate } from "react-router-dom"


const Navbar = () => {
    const [selectedRoute,setSelectedRoute]=useState("products")

    const navigate=useNavigate()


  return (
    <div className="bg-cyan-200 flex justify-between px-10 h-10 ">
        <button className={selectedRoute==='addProduct'?"border-b-2 opacity-10":"border-0 cursor-pointer" } onClick={()=>{setSelectedRoute('addProduct');navigate('/')}}>Add Puroduct</button>
        <button className={selectedRoute==='products'?"border-b-2 opacity-10":"border-0 cursor-pointer"} onClick={()=>{setSelectedRoute("products");navigate("/all")}} >View Products</button>
        <button className={selectedRoute==='sale'?"border-b-2 opacity-10":"border-0 cursor-pointer"} onClick={()=>{setSelectedRoute("sale");navigate("/saleEntry")}}>Sale Entry</button>
        <button className={selectedRoute==='viewsale'?"border-b-2 opacity-10":"border-0 cursor-pointer"} onClick={()=>{setSelectedRoute("viewsale");navigate("/allBill")}}>View Sale</button>
        <button className={selectedRoute==='dashboard'?"border-b-2 opacity-10":"border-0 cursor-pointer"} onClick={()=>{setSelectedRoute("dashboard");navigate("/dashboard")}}>Dashboard</button>
    </div>
  )
}

export default Navbar