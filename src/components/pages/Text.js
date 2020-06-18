import React from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'

import { DotWave } from '../ui'

import { useQuery } from 'react-apollo'
import { GET_TEXT_BY_ID } from '../../queries/text.queries'

export const Text = () => {

  /* Paramaters */
  let { id } = useParams();

  const { loading, data, refetch } = useQuery(GET_TEXT_BY_ID, {
    variables: {
      id: id
    }
  })

  // Check for updates every 30 seconds
  setInterval(refetch, 30000)

  if (loading || !data) return <DotWave />
  console.log(data);
  let text = data.texts[0]
  return (
    <StyledText size={text.size} font={text.font} color={text.color}>
      <h1>{text.text}</h1>
    </StyledText>
  )
}

export default Text

const StyledText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  color: ${props => props.color || 'white'};
  font-family: ${props => props.font || 'Stacked Pixel'};
  font-size: ${props => props.size || '24px'}
`