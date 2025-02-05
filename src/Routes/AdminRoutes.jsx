import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminDashbord from '../Admin/AdminDashbord'

function AdminRoutes() {
  return (
    <Routes>
    <Route path="/admin" element={<AdminDashbord />} />
  </Routes>
  )
}

export default AdminRoutes