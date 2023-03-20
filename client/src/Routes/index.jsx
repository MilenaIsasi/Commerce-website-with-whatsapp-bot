import { createBrowserRouter} from 'react-router-dom'
import FormLogin from '../components/FormLogin';
import NotFound from '../components/NotFound';
import Register from '../components/Register';
import Layout from '../layouts/Layout';
import AddCarrito from '../screens/AddCarrito';
import Home from '../screens/Home';


export const  router =  createBrowserRouter([
    {
        path: '/',
        element: <Layout/>,
        errorElement: <NotFound />,
        children: [
            {   path: '/',
                index: true,
                element: <FormLogin />,
            },
            {
                path:'add',
                element: <AddCarrito />
            },
            {
                path:'home',
                element: <Home />
            },
            {
                path:'register',
                element: <Register />
            },
        ]
    }
]);

