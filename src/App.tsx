import Dash from "./pages/Dashboard"
import { Signup } from "./pages/Signup"
import SignIn from "./pages/Signin"
import Dashh from "./pages/trial"
import Home from "./pages/HomePage"
import Try2 from "./pages/graBg"
import { BrowserRouter ,Routes ,Route } from "react-router-dom"
import SharedBrain from "./pages/SharedBrain"
import Try22 from "./pages/trial22"


export default function App() {
  return <BrowserRouter>
    <Routes>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/dashboard" element={<Dash/>}/>
      <Route path="/signin" element={<SignIn/>}/>
      <Route path="/trial" element={<Dashh/>}/>
      <Route path="/share/:shareId" element={<SharedBrain/>}/>
      <Route path="/bgG" element={<Try2/>} />
      <Route path="/" element={<Home/>} />
      <Route path="/try2" element={<Try22/>} />
    </Routes>
  </BrowserRouter>
}