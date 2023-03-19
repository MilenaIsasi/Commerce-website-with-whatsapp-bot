import React from 'react'
import Content from './Content'
import Footer from './Footer'
import Header from './Header'

const AdminPanel = () => {
  return (
    <div className="hold-transition sidebar-mini">
        <>
          <Header />
          <Content />
          <Footer />
        </>
    </div>
  )
}

export default AdminPanel