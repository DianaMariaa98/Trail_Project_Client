import { useContext } from 'react';
import { AuthContext } from '../contexts/auth.context';
import { Navigate } from 'react-router-dom';

import React from 'react'

function Anon(props) {
    const {loading, loggedIn}  = useContext(AuthContext);
    //first we check if the page it still loading
    if(loading) return <p>Loading...</p>
    //if the user is not loggedIn we redirect to the login page
    if(!loggedIn){
    //if the user is not loggedIn we return the children(the page we are trying to protect)
    return props.children;
    } else {
        return <Navigate to="/"/>
    }
}

export default Anon