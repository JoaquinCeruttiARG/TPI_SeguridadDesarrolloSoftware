import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from 'js-cookie';

const ProtectedRoute = ({element}) => {
    const token = Cookies.get('authtoken');

    if(!token){
        return <Navigate to="/login" replace/>;
    }

    return element;
}

export default ProtectedRoute