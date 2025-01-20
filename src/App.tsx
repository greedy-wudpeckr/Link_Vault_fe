
import { Signup } from "./pages/Signup"
import SignIn from "./pages/Signin"
import Home from "./pages/HomePage"
import Dashboard from "./pages/Dashboard"
import { Navigate, } from "react-router-dom"

import { BrowserRouter ,Routes ,Route } from "react-router-dom"


export default function App() {
  
  return <BrowserRouter>
    <Routes>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/signin" element={<SignIn/>}/>
      <Route path="/" element={<Home/>} />
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  </BrowserRouter>
}