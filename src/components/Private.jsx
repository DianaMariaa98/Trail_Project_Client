import { useContext } from 'react';
import { AuthContext } from '../contexts/auth.context'
import { Navigate } from 'react-router-dom';

import React from 'react'

function Private(props) {
  const {loading, loggedIn} = useContext(AuthContext);
  //first we check if the page is still loading
  if(loading) return <p>Loading...</p>
  //if the user is not loggedIn we redirect to the login page
  if(!loggedIn) {
  return <Navigate to="/login"/>
  } else {
    return props.children;
  }
}

export default Private