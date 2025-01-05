import { ReactElement } from "react";

interface SideProps {
    text : string;
    icon : ReactElement;
}

export function SideItem(props : SideProps){
    return <div className="flex items-center p-2 border-b cursor-pointer hover:bg-gray-200">
        <div className="p-2"> {props.icon} </div>
        
        <div className="ml-2">{props.text}</div>
    </div>
}