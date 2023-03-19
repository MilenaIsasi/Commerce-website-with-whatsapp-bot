import { createBrowserRouter} from 'react-router-dom'
import FormLogin from '../components/FormLogin';
import NotFound from '../components/NotFound';
import Register from '../components/Register';
import Layout from '../layouts/Layout';
import LayoutPanel from '../layouts/LayoutPanel';
import AddCarrito from '../screens/AddCarrito';
import AdministrarProductos from '../screens/AdminPanel/AdministrarProductos';
import AdministrarUsuarios from '../screens/AdminPanel/AdministrarUsuarios';
import AdminPanel from '../screens/AdminPanel/AdminPanel';
import { Homescreen } from '../screens/Homescreen';


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
        path: '/cpanel',
        element: <AdminPanel />,
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
                element: <Homescreen />
            },
        ]
    },
    {
        path: '/',
        element: <LayoutPanel />,
        errorElement: <NotFound />,
        children: [
            {
                path:'cpanel/adm/users',
                element: <AdministrarUsuarios />
            },
            {
                path:'cpanel/adm/products',
                element: <AdministrarProductos />
            },
        ]
    }
]);

