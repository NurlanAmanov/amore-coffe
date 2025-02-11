import React, { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Layout from './layout/Layout'
import Haqqimizda from './component/Main/Haqqimizda'
import Homepage from './component/Main/Homepage'
import Contact from './component/Main/Contact'
import Teklif from './component/Main/Teklif'
import Product from './component/product/Product'
import Allcategory from './component/All-category/Allcategory'
import Checkout from './component/checkout/Checkout'
import Registr from './login/Registr'
import Cabinet from './component/Usecabiner/Cabinet'


function App() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return (
    <>
<Routes>
  <Route path="/" element={<Layout />}>
  <Route index element={<Homepage />} />
    <Route path="haqqimizda" element={<Haqqimizda />} />
    <Route path="Elaqe" element={<Contact />} />
    <Route path="teklif" element={<Teklif />} />
    <Route path="Product" element={<Product />} />
    <Route path="Allcategory" element={<Allcategory />} />
    <Route path="about" element={<Haqqimizda />} />
    <Route path="Contact" element={<Contact />} />
    <Route path="qeydiyyat" element={<Registr />} />
    <Route path="Cabinet" element={<Cabinet />} />

    <Route path="Check" element={<Checkout />} />
  </Route>
</Routes>

    </>
  )
}

export default App