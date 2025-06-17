import Navbar from "../components/PageComponents/NavBar"
import InviteList from "../components/PageComponents/InviteList"
import { useState, useContext } from "react"
import { gameContext } from "../App"
import Modal from "react-modal"

Modal.setAppElement('div');

export default function InvitePage({invites}){
    
    const {Socket, ClientID} = useContext(gameContext);
    const [clientID, setClientID] = ClientID;
    const socket = Socket

    let tempOpponentID = ""
    
    const [isOpen, setIsOpen] = useState(false);

    const temp = [1,2,3,4,5,6,7,8,9,10,11]

    function openModal(){
        setIsOpen(true);
    }

    function afterOpenModal(){

    }

    function closeModal(){
        setIsOpen(false);
    }
    const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
    };

    return(
        <div>
            <Navbar></Navbar>
            {/* <form>
                <input className="border background-dark2" type="text" onChange={(e)=>{tempID = e.target.value}} placeholder="userID"></input>
                <button type="button" onClick={()=>{setClientID(tempID)}}>change</button>
            </form>

            <form>
                <input className="border background-dark2" type="text" onChange={(e)=>{opponent = e.target.value}} placeholder="OpponentID"></input>
                <button type="button" onClick={()=>{socket.emit("invite", opponent, clientID)}}>Send Invite</button>
            </form> */}
            <div id="box" className="box">
                <div className="card invite-box">
                    {/* <InviteList invites={invites}></InviteList> */}
                    <InviteList invites={temp}></InviteList>
                </div>
                <button className="button invite-button" type="button" onClick={openModal}>Invite Player</button>
                <Modal 
                isOpen={isOpen}
                ariaHideApp={false}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                className={"modal"}
                contentLabel="Invite Modal">
                    
                    <form>
                        <input className="" type="text" placeholder="Opponent Username" onChange={(e)=>{tempOpponentID = e}}></input>
                        <button className="button" type="button" onClick={()=>{socket.emit("invite", tempOpponentID, clientID)}}>Send Invite</button>
                    </form>
                </Modal>
            </div>
        </div>
    )
}