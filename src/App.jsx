import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './layout/Layout'

import Haqqimizda from './component/Main/Haqqimizda'
import Main from './component/Main/Main'

function App() {
  return (
    <>
<Routes>
  <Route path="/" element={<Layout />}>
  <Route index element={<Main />} />
    <Route path="haqqimizda" element={<Haqqimizda />} />
  </Route>
</Routes>

    </>
  )
}

export default App