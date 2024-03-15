import React from 'react'
import ShopPage from './components/ShopPage'
import CartPage from './components/CartPage.jsx'
import UserContextcomp from '../src/utils/UserContext'
import {BrowserRouter,Routes,Route, Navigate} from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  return <>
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<UserContextcomp><ShopPage/></UserContextcomp>}/>
      <Route path="/cartpage" element={<UserContextcomp><CartPage/></UserContextcomp>}/>
      <Route  path="*" element={<Navigate to={"/"}/>}/>
   </Routes>
   </BrowserRouter>
  </>
}

export default App