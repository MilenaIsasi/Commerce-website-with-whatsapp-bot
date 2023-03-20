import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../screens/AdminPanel/Header'

const LayoutPanel = () => {
    return (
    <>
        <Header />
        <div className="container mt-5">
            <Outlet />
        </div>
    </>
)
}

export default LayoutPanel
