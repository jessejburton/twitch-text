import React, { useContext, useState, useEffect } from 'react'
import styled, { ThemeContext } from 'styled-components';
import gql from 'graphql-tag'
import { useQuery, useMutation } from 'react-apollo'

import { useAuth0 } from "../../react-auth0-spa";
import { Form, FormBlock, MediumSpace } from '../styles'
import { Button, DotWave } from '../ui'
import { Layout } from '../layout'

import {
  StyledContent,
  FullSection,
  FullPage
} from '../styles'

const Home = () => {

  /* Authentication */
  const { loading, isAuthenticated, loginWithRedirect, logout, user } = useAuth0();

  /* State */
  const [text, setText] = useState("")
  const [textData, setTextData] = useState([])

  /* Context */
  const theme = useContext(ThemeContext);

  /* Queriers */
  const { loading: dataLoading, data, refetch } = useQuery(GET_TEXTS, {
    variables: {
      email: ""
    }
  });

  /* Functions */
  function addText() {
    console.log(text)
    setTextData(prevState => {
      return {
        text,
        ...prevState,
      }
    })
  }

  useEffect(() => {
    if (isAuthenticated && user) {
      refetch({
        email: user.email
      }).then(response => {
        setTextData(response.data.texts)
      })
    }
  }, [user])

  if (loading || dataLoading) return (
    <FullPage
      bgColor={theme.colors.background}
      color={theme.colors.font}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
      <DotWave />
    </FullPage>
  )

  if (!isAuthenticated) {
    return (
      <FullSection
        bgColor={theme.colors.background}
        color={theme.colors.font}>
        <StyledContent>
          <h1>Welcome</h1>
          <p><TextButtonLink hoverColor={theme.colors.primary} onClick={loginWithRedirect}>Login</TextButtonLink> or <TextButtonLink hoverColor={theme.colors.primary} onClick={loginWithRedirect}>Signup</TextButtonLink> to start creating text browser sources for your Twitch stream.</p>
        </StyledContent>
      </FullSection>
    )
  }

  if (isAuthenticated) {
    return (
      <Layout>
        <FullSection
          bgColor={theme.colors.background}
          color={theme.colors.font}>
          <StyledContent>
            <h1>Welcome, {user.name}</h1>
            <p>Add some text · select a font · get the link for OBS!</p>
            <Form>
              <FormBlock>
                <h3>Add Text Source</h3>
                <div style={{ display: "flex" }}>
                  <input
                    type="text"
                    value={text}
                    placeholder="Welcome to my stream!"
                    onChange={(e) => setText(e.target.value)} />
                  <Button
                    style={{ width: "100px", height: "auto" }}
                    onClick={(e) => { e.preventDefault(); setText(e.target.value) }}>
                    Add
                </Button>
                </div>
              </FormBlock>
            </Form>
            <MediumSpace>
              <StyledTexts>
                {textData &&
                  textData.map(text => (
                    <div key={text.id}>{text.text}</div>
                  ))
                }
              </StyledTexts>
            </MediumSpace>
          </StyledContent>
        </FullSection>
      </Layout>
    )
  }
}

export default Home

const TextButtonLink = styled.button`
  display: inline-block;
  background-color: transparent;
  border: none;
  color: inherit;
  font-size: inherit;
  transition: all .3s ease;
  cursor: pointer;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: .3rem;
    bottom: -2px;
    left: 0;
    background-color: white;
    opacity: .3;
    transition: all .3s ease;
  }

  &:hover {
    color: ${props => props.hoverColor || "inherit"};

    &::after {
      height: .5rem;
      background-color: ${props => props.hoverColor || "white"};
    }
  }
`

const StyledTexts = styled.div`

`

const GET_TEXTS = gql`
  query getTexts($email: String!){
    texts(where: {email: $email}){
      id
      text
      font
      size
    }
  }
`

const CREATE_TEXT = gql`
  mutation addText(
    $email: String!,
    $text: String!,
    $font: String!,
    $size: String!
  ){
    createText(data: {
      email: $email
      text: $text
      font: $font
      size: $size
    }){
      id
      text
      font
      size
    }
  }
`