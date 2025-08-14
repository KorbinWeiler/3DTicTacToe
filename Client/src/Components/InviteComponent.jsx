import { useState, useEffect } from "react"
import SearchUserComponent from "./SearchUserComponent";

export default function InviteComponent() {
    const [searchBool, setSearchBool] = useState(true)
    return (
        <>
            <div className="button-wrapper">
                <button className="search-type-button" onClick={() => setSearchBool(true)}>Search User</button>
                <button className="search-type-button" onClick={() => setSearchBool(false)}>Online Users</button>
            </div>
            {searchBool ? <SearchUserComponent/> : "null"}
        </>
    )
}