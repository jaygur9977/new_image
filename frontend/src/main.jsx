import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Home from './components/Home.jsx';
import { GoogleOAuthProvider } from '@react-oauth/google';
import SplashScreen from './components/SplashScreen.jsx';




const router = createBrowserRouter([
  {
    path: "/",
    element: <SplashScreen />,
  },
  {
    path: "/navbar",
    element: <Navbar />,
  },
  {
    path: "/home",
    element: <Home />,
  },

 

]);

createRoot(document.getElementById('root')).render(

  <StrictMode>
<GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_API}>


    <Navbar/>
    <RouterProvider router={router} />
  </GoogleOAuthProvider>;


  </StrictMode>
);
