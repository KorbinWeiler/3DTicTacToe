import "../../App.css"
import Home from "../../assets/Home.svg"
import SidebarIcon from "./SidebarIcon"

export default function Navbar(){
    return(
        <div className="navbar">
            <SidebarIcon imageLink={Home} destinationLink={"/"}/>
            <SidebarIcon destinationLink={"/Login"}/>
        </div>
    )
}