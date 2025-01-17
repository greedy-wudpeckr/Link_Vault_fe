import { SideItem } from "./Sideitem"
import { TwitterIcon } from "../icons/twitter"
import { YtIcon } from "../icons/yt"
import { Logo } from "../icons/Brain"


export default function Sidebar() {
    return <div className="h-screen bg-slate-700 z-10 border-r w-72 fixed" >
       <div id="PageName" className="pt-4 pb-2 items-center">
       <img className="h-10 m-2" src="src\assets\lll2.png" alt="logo" />
        </div> 
    <div className="">
        <SideItem text="Youtube" icon={<YtIcon/>}/>
        <SideItem text="Twitter" icon={<TwitterIcon/>}/>
    </div>

    </div>
}