
export default function SidebarIcon({imageLink, destinationLink}){
    return(
        <div>
            <a href={destinationLink}><div className="icon"></div></a>
            {/* <a href={destinationLink}><svg className="icon" src={imageLink}/></a> */}
        </div>
    )
}