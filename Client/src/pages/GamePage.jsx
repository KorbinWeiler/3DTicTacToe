import GameUI from "../components/GameUI"

export default function GamePage(){
    function fuckall(){
        console.log("idk man")
    }

    return (
        <div className="grid grid-cols-2">
            <div className="align-middle m-2  justify-items-start">
                <form className="m-2" onSubmit={fuckall}>
                    <label>userID</label>
                    <input className="border rounded" type="text" placeholder="UserId"></input>
                    <button className="text-blackck" type="submit" text="Set UserID"></button>
                </form>
                <form className="m-2" onSubmit={fuckall}>
                    <label>OpponentID</label>
                    <input className="border rounded" type="text" placeholder="UserId"></input>
                    <button className="text-black" type="submit" text="Send Invite"></button>
                </form>
            </div>
            <div>
                <GameUI/>
            </div>
        </div>
    )
}