import { useState } from "react"
export default function SearchUserComponent(){
    const [targetUsername, setTargetUsername] = useState("")
    const handleSearch = (e) => {
        e.preventDefault();
        // Implement search logic here
        console.log("Searching for user:", targetUsername);
    }
    return (
        <div className="search-user-component">
            <form>
                <input type="text" placeholder="Search for a user..." onChange={(e)=>{setTargetUsername(e)}} value={targetUsername}/>
                <button type="submit" onClick={handleSearch}>Search</button>
            </form>
        </div>
    )
}