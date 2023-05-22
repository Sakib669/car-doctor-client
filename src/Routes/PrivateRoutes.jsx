/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { Navigate, useLoaderData, useLocation } from 'react-router-dom';

const PrivateRoutes = ({children}) => {
    const {user, loading} = useContext(AuthContext);
    const location = useLocation();
    console.log(location);

    if(loading){
        return <progress className="progress progress-success w-full"></progress>
    }

    if(user?.email){
        return children;
    }

    return <Navigate state={{from: location}} replace to='/login' ></Navigate>
};

export default PrivateRoutes;