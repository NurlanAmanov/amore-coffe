import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './layout/Layout'
import Haqqimizda from './component/Main/Haqqimizda'
import Main from './component/Main/Main'
import Contact from './component/Main/Contact'
import Teklif from './component/Main/Teklif'


function App() {
  return (
    <>
<Routes>
  <Route path="/" element={<Layout />}>
  <Route index element={<Main />} />
    <Route path="haqqimizda" element={<Haqqimizda />} />
    <Route path="Elaqe" element={<Contact />} />
    <Route path="teklif" element={<Teklif />} />
  </Route>
</Routes>

    </>
  )
}

export default App