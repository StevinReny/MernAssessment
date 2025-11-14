
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NewProduct from './pages/NewProduct';
import AllProducts from './pages/AllProducts';
import SeeAllBill from './newComponent/NewSaleEntry';
import NewSaleEntry1 from './newComponent/NewSaleEntry1';
import DashBoard from './pages/DashBoard';
function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <Router>
          <Routes>
            <Route path="/" element={<NewProduct/>}/>
            <Route path="/all" element={<AllProducts/>}/>
             <Route path="/allBill" element={<SeeAllBill/>}/>
             <Route path="/saleEntry" element={<NewSaleEntry1/>}/>
              <Route path="/dashboard" element={<DashBoard/>}/>
          </Routes>
        </Router>
    </>
  )
}

export default App
