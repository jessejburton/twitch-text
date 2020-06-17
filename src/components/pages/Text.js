import React from 'react'
import styled from 'styled-components'

export const Text = () => {
  return (
    <StyledText>
      <h1>TEXTX</h1>
    </StyledText>
  )
}

export default Text

const StyledText = styled.div`
  display: flex;
  justify-content: center;
  width: 100vw;
`