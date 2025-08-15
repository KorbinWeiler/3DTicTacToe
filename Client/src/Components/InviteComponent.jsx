import { useState, useEffect } from "react"
import SearchUserComponent from "./SearchUserComponent";
import OnlineUsersComponent from "./OnlineUsersComponent";

export default function InviteComponent() {
    const [searchBool, setSearchBool] = useState(true)
    return (
        <>
            {searchBool ? 
            <div className="button-wrapper">
                <button className="state-button selected" onClick={() => setSearchBool(true)}>Search User</button>
                <button className="state-button" onClick={() => setSearchBool(false)}>Online Users</button>
            </div> :
            <div className="button-wrapper">
                <button className="state-button" onClick={() => setSearchBool(true)}>Search User</button>
                <button className="state-button selected" onClick={() => setSearchBool(false)}>Online Users</button>
            </div>}
            {searchBool ? <SearchUserComponent/> : <OnlineUsersComponent/>}
        </>
    )
}