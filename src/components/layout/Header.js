import React, { useContext } from 'react'
import styled, { ThemeContext } from 'styled-components';

import { useAuth0 } from "../../react-auth0-spa";

const Header = () => {

  /* Authentication */
  const { loading, isAuthenticated, loginWithRedirect, logout, user } = useAuth0();

  /* Context */
  const theme = useContext(ThemeContext);

  if (loading) return null
  return (
    <StyledHeader
      bgColor={theme.colors.backgroundHeader}
      color={theme.colors.fontHeader}
    >
      <div style={{ display: "flex", alignItems: "baseline" }}>
        <h1>TWITCH TEXT</h1>
        {
          isAuthenticated &&
          <span style={{ marginLeft: "2.5rem" }}>Welcome, <strong>{user.name}</strong></span>
        }
      </div>
      <div className="nav">
        {
          !isAuthenticated &&
          <button onClick={loginWithRedirect}>Login / Signup</button>
        }
        {
          isAuthenticated &&
          <button onClick={logout}>Logout</button>
        }
      </div>
    </StyledHeader>
  )
}

export default Header

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 8rem;
  padding: 0 5rem;
  background-color: ${props => props.bgColor};
  color: ${props => props.color};

  .nav {
    display: flex;
    height: 100%;
  }

  button {
    font-size: 16px;
    text-transform: uppercase;
    display: block;
    color: ${props => props.color};
    border: none;
    padding: 1rem;
    background-color: transparent;
    cursor: pointer;
    transition: all .3s ease;
    outline: none;
  }

  button:hover {
    color: white;
  }
`