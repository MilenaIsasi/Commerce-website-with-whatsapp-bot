import React from 'react'
import { Outlet } from 'react-router-dom'
import { Navbar } from '../components/Navbar'


const Layout = () => {
    return (
    <>
    <div className='mb-5'>
    <Navbar />
    </div>
        <div className="container" style={{marginTop:"50px"}}>
            <Outlet />
        </div>
    </>
)
}

export default Layout
