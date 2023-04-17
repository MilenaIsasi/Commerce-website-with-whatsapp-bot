import React from 'react'
import Content from './Content'
import useGetUsuarios from './customHooks/useGetUsuarios';

const AdminPanel = () => {
  const data = useGetUsuarios();
  return (
    <div>
        <>
          <Content />
        </>
    </div>
  )
}

export default AdminPanel