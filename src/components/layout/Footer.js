import React from 'react'
import styled from 'styled-components'
import { defaultTheme } from '../themes'

const Footer = () => {
  return (
    <StyledFooter>
      <p>built by <a href="https://www.burtonmediainc.com" target="_blank">BURTON<strong>MEDIA</strong></a> &copy; 2020</p>
    </StyledFooter>
  )
}

export default Footer

const StyledFooter = styled.footer`
  position: fixed;
  text-align: center;
  width: 100vw;
  bottom: 0;
  padding: 3rem;
  font-size: 1.4rem;
  color: ${defaultTheme.colors.font};

  a {
    color: inherit;
  }
`
