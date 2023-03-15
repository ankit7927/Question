import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'

const Layout = () => {
  return (
    <div>
      <Navbar />
      <main className='container'>
        <Outlet />
      </main>
    </div>

  )
}

export default Layout