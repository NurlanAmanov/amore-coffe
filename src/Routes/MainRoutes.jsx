import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Haqqimizda from '../component/Main/Haqqimizda'
import Contact from '../component/Main/Contact'
import Teklif from '../component/Main/Teklif'
import Product from '../component/product/Product'
import Allcategory from '../component/Main/Allcategory'
import Checkout from '../component/checkout/Checkout'
import Layout from '../layout/Layout'
import Homepage from '../component/Main/Homepage'

function MainRoutes() {
  return (
   <Routes>
     <Route path="/" element={<Layout />}>
     
     <Route index element={<Homepage/>} />
       <Route path="haqqimizda" element={<Haqqimizda />} />
       <Route path="Elaqe" element={<Contact />} />
       <Route path="teklif" element={<Teklif />} />
       <Route path="Product" element={<Product />} />
       <Route path="Allcategory" element={<Allcategory />} />
       <Route path="Check" element={<Checkout />} />
     </Route>
   </Routes>
  )
}

export default MainRoutes