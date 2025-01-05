import { SideItem } from "./Sideitem"
import { TwitterIcon } from "../icons/twitter"
import { YtIcon } from "../icons/yt"
import { Logo } from "../icons/Brain"


export default function Sidebar() {
    return <div className="h-screen bg-white border-r w-72 fixed" >
       <div id="PageName" className="flex text-2xl pt-8 pb-4 items-center font-bold font-serif">
        <div className="pr-2">
            <Logo/>
            </div>
        Brainly
        </div> 
    <div>
        <SideItem text="Youtube" icon={<YtIcon/>}/>
        <SideItem text="Twitter" icon={<TwitterIcon/>}/>
    </div>

    </div>
}