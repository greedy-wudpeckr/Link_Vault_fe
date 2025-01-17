
import InteractiveHoverButton from "../components/Btn"
import { useNavigate } from "react-router-dom"
import Ghost from "../icons/Ghosts";
import Navbar from "../components/Nav";

export default function Home(){

    const navigate = useNavigate();

    const handleClick = ()=>{
        navigate("/signup")
    }

    return (
     <div className="flex flex-col relative h-screen  items-center w-screen
       overflow-hidden
  bg-gradient-to-br from-law via-ren to-cium p-3
   before:absolute before:left-[5%] before:top-[5%]
  before:h-[60%] before:w-[60%] before:animate-blob before:origin-center
  before:bg-red-200 before:rounded-full before:blur-[80px]
  before:brightness-125

  after:absolute after:right-[5%] after:bottom-[10%]
  after:h-[60%] after:w-[60%] after:animate-blob-reverse after:origin-center
  after:bg-purple-600 after:rounded-full after:blur-[80px]
  after:brightness-125
      ">
        <Navbar/>
        <div className="flex flex-col mt-40 text-center items-center z-10">
            <div>
             <span className="flex text-xl text-white"><Ghost/> &nbsp;Welcome to Link Vault</span>
            </div>
            <div className="text-center flex flex-col pb-4">
               <span className="text-6xl p-2 font-bold"> Store your favorite</span>
               <span className="text-6xl pt-2 font-bold" >links in one secure place.</span>
               </div>
            <div className="pb-4">
                <p className="text-xl">Easily save and revisit YouTube and Twitter content anytime!</p>
            </div>
            <div>
                <InteractiveHoverButton onClick={handleClick}/>
                </div>
        </div>
     </div>
    )
}