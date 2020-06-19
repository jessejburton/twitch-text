import React from 'react'
import { Redirect } from "react-router-dom";

import { useAuth0 } from "../../react-auth0-spa";

export const Logout = () => {

  /* Authentication */
  const { loading, logout } = useAuth0();

  if (loading) return null
  logout()
  return (
    <Redirect
      to={{
        pathname: "/"
      }}
    />
  )
}

export default Logout
