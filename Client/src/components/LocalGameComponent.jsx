import { useNavigate } from "react-router-dom";

export default function LocalGameComponent({ gameID }) {
    const trimmedID = gameID.replace("localgame-", "");
    const navigate = useNavigate();
    return (
        <div className="local-game-component" onClick={() => navigate(`/Game/${gameID}`)}>
            Local Game: {trimmedID}
        </div>
    );
}