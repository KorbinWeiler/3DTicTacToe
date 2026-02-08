import { useState } from "react";
import Modal from "react-modal"

Modal.setAppElement('div');
export default function InviteModal({open}){

    const [isOpen, setOpen] = open

    function openModal(){
        setOpen(true);
    }

    function afterOpenModal(){

    }

    function closeModal(){
        setOpen(false);
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

    return (
        <Modal 
        isOpen={isOpen}
        ariaHideApp={false}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        className={"modal"}
        contentLabel="Invite Modal"> 
            <form className="modal-alignment">
                <input className="text-input" type="text" placeholder="Opponent Username" onChange={(e)=>{tempOpponentID = e}}></input>
                <button className="button" type="button" onClick={()=>{socket.emit("invite", tempOpponentID, clientID)}}>Send Invite</button>
            </form>
        </Modal>
    )
}