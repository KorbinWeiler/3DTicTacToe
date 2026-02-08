import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../Utils/UserContext";
import ProtectedRoute from "./ProtectedRoute";

export default function RestrictedRoute({ children}) {
    const { User } = useContext(UserContext);
    
    return (<ProtectedRoute>{children}</ProtectedRoute> );
}