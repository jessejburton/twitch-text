import styled from 'styled-components'

export const FullSection = styled.section`
  min-height: 90vh;
  padding: 5rem 0;
  width: 100vw;
  background-color: ${props => props.bgColor || 'white'};
  color: ${props => props.color || 'black'};
`

export const FullPage = styled.section`
  min-height: 100vh;
  position: absolute;
  padding: 5rem 0;
  width: 100vw;
  background-color: ${props => props.bgColor || 'white'};
  color: ${props => props.color || 'black'};
`

export const MediumSpace = styled.div`
  padding: 5rem 0;
`