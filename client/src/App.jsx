import { useEffect, useState } from 'react'
import './App.css'
import Navbar from './component/header/Navbar'
import Newnav from './component/header/NewNavbar/Newnav'
import Maincomponent from './component/Maincomponent/Maincomponent'
import Footer from './component/footer/Footer'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Signin from './component/Signup_Signin/Signin'
import Signup from './component/Signup_Signin/Signup'
import Cart from './component/cart/Cart'
import Buynow from './component/buynow/Buynow'
import CircularProgress from '@mui/material/CircularProgress';

function App() {

  const [data,setData]=useState(false)

  useEffect(()=>{
    setTimeout(()=>{
      setData(true)
    },2000)
  },[])

  return (
    <>
    {

      data ?(<div className='bg-slate-100'>

      <Navbar />
      <Newnav />
      <Routes>
        <Route path='/' element={<Maincomponent />} />
        <Route path='/login' element={<Signin />} />
        <Route path='/register' element={<Signup />} />
        <Route path='/getproductsone/:id' element={<Cart />} />
        <Route path='/buy-now' element={<Buynow />}></Route>
      </Routes>
      <Footer />

    </div>):(
      <div className='circle w-[100%] h-[100vh] flex justify-center items-center'>
        <CircularProgress/>
        <h2 className='text-2xl font-bold m-3'>Loading...</h2>
      </div>
    )

    }
      
    </>

  )
}

export default App
