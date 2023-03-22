import { createBrowserRouter} from 'react-router-dom'
import FormLogin from '../components/FormLogin';
import NotFound from '../components/NotFound';
import Register from '../components/Register';
import Layout from '../layouts/Layout';
import LayoutPanel from '../layouts/LayoutPanel';
import AddCarrito from '../screens/AddCarrito';
import Home from '../screens/Home';
import AdministrarProductos from '../screens/AdminPanel/AdministrarProductos';
import AdministrarUsuarios from '../screens/AdminPanel/AdministrarUsuarios';
import AdminPanel from '../screens/AdminPanel/AdminPanel';
import ProductosAdd from '../screens/AdminPanel/customHooks/ProductoAdd';


export const  router =  createBrowserRouter([
    {   path: '/',
        index: true,
        element: <FormLogin />,
    },
    {
        path:'register',
        element: <Register />
    },
    {
        path: '/',
        element: <Layout/>,
        errorElement: <NotFound />,
        children: [
            {
                path:'add',
                element: <AddCarrito />
            },
            {
                path:'home',
                element: <Home />
            },
        ]
    },
    {
        path: '/cpanel',
        element: <LayoutPanel />,
        errorElement: <NotFound />,
        children: [
            {
                path:'adm',
                element: <AdminPanel />
            },
        ]
    },
    {
        path: '/cpanel',
        element: <LayoutPanel />,
        errorElement: <NotFound />,
        children: [
            {
                path:'adm',
                element: <AdminPanel />
            },
            {
                path:'adm/users',
                element: <AdministrarUsuarios />
            },
            {
                path:'adm/products',
                element: <AdministrarProductos />
            },
            {
                path:'adm/agregar',
                element: <ProductosAdd />
            },
        ]
    }
]);

