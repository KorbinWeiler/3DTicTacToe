import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../App";
import ProtectedRoute from "./ProtectedRoute";

export default function RestrictedRoute({ children}) {
    const { User } = useContext(UserContext);
    
    // Check if the user has the required authentication method
    if (User.gameID === undefined || User.gameID === null) {
        return <Navigate to="/Home" replace />;
    }
    
    return (<ProtectedRoute>{children}</ProtectedRoute> );
}