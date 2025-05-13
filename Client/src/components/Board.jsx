import GameButton from "./GameButton"
export default function Board(){
    return (
        <>
            <div className="grid grid-cols-4 m-5">

                <GameButton/>
                <GameButton/>
                <GameButton/>
                <GameButton/>

                <GameButton/>
                <GameButton/>
                <GameButton/>
                <GameButton/>

                <GameButton/>
                <GameButton/>
                <GameButton/>
                <GameButton/>

                <GameButton/>
                <GameButton/>
                <GameButton/>
                <GameButton/>
                
            </div>
        </>
    )
}