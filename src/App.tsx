import Dash from "./pages/Dashboard"
import { Signup } from "./pages/Signup"
import { SignIn } from "./pages/Signin"

import { BrowserRouter ,Routes ,Route } from "react-router-dom"
import SharedBrain from "./pages/SharedBrain"

export default function App() {
  return <BrowserRouter>
    <Routes>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/dashboard" element={<Dash/>}/>
      <Route path="/signin" element={<SignIn/>}/>
      <Route path="/share/:shareId" element={<SharedBrain/>}></Route>
    </Routes>
  </BrowserRouter>
}